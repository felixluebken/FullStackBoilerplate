import React from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import './panels.css'




  


function StaffTicketWrapper(props) {

  
  const columns = [
    {
        field: 'user',
        headerName: 'Email',
        width: 200,
        editable: false,
        headerClassName: 'data-grid--header',
        renderCell: (params) => <Typography sx={{fontWeight:600}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
            {getUser(params.value)}
        </Typography>
    },
      {
        field: 'event',
        headerName: 'Event',
        width: 200,
        editable: false,
        headerClassName: 'data-grid--header',
        renderCell: (params) => <Typography sx={{fontWeight:600}} variant="caption" noWrap component="div" align="left" style={{color:"#FF5622",userSelect:"none"}}>
            {getEvent(params.value).label}
        </Typography>
      },
      {
        field: 'purchase_data',
        headerName: 'Location',
        width: 150,
        editable: false,
        headerClassName: 'data-grid--header',
        renderCell: (params) => <Typography sx={{fontWeight:600}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
            {getClub(getEvent(params.row.event).club).label}
        </Typography>
      },
      {
        field: 'purchase_date',
        headerName: 'Purchase Date',
        editable: false,
        width: 150,

        headerClassName: 'data-grid--header',
        renderCell: (params) => <Typography sx={{fontWeight:600}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
            {getFormattedDate(new Date(params.value))+" "+getFormattedTime(new Date(params.value))}
        </Typography>
      },
      {
        field: 'price',
        headerName: 'Ticket Price',
        sortable:false,
        editable:false,
        width: 80,
        headerClassName: 'data-grid--header',
        renderCell: (params) => <div 
          style={{
              backgroundSize:"cover",
              backgroundPosition:"center",
              width:"100px",
              height:"30px",
              borderRadius:"25px",
              backgroundColor:"#1DCC99",
              display:"flex",
              justifyContent:"space-around",
              alignItems:"center"
          }}
        >
          <Typography sx={{fontWeight:600}} variant="caption" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
            {"$"+params.value}
          </Typography>
        </div>,
      },
      {
        field: 'purchase_confirmed',
        headerName: '',
        editable: false,
        width: 20,
    
        headerClassName: 'data-grid--header',
        renderCell: (params) => {
          if(params.value) {
            return(
                <CheckCircleIcon fontSize='small' style={{color:"rgb(29, 204, 153)"}} />
            )
          }
          else {
            return(
                <CancelIcon  fontSize='small' style={{color:"#880808"}} />
            )
    
          }
        }
      },
  ];

  const getClub = (id) => {
    for(var i = 0; i < props.clubs.length; i++) {
      if(props.clubs[i].id === id) return props.clubs[i]
    }
    return {label:"null"}
  }
  const getEvent = (id) => {
    for(var i = 0; i < props.events.length; i++) {
      if(props.events[i].id === id) return props.events[i]
    }
    return id
  }
  const getUser = (id) => {
    for(var i = 0; i < props.users.length; i++) {
      if(props.users[i].id === id) return props.users[i].email
    }
    return id
  }

  const getFormattedDate = (date) => {

    var year = date.getFullYear()
    var month = date.getMonth()+1
    var day = date.getDate()
    if(month < 10) month = "0"+month
    if(day < 10) day = "0"+day
    return day + '/' + month + '/' + year;
  }
  
  const getFormattedTime = (time) => {
    var hours = time.getHours();
    var minutes = time.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes
  }


    return(
        <div className="tall-event_panel" style={{height:"800px"}}>
          <div className="panel-header">
            <Typography sx={{fontWeight:600}} variant="h6" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
                {"Tickets Sold"}
            </Typography>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%", border:"1px solid #adb0be" }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Tickets"
                inputProps={{ 'aria-label': 'search tickets' }}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
          <div style={{ height: "740px", width: '100%' }}>
          <DataGrid
              sx={{
                  width: 1,
                  '& .data-grid--header': {
                    color: '#adb0be',
                  },
              }}
              rowHeight={40}
              style={{border:"none"}}
              rows={props.tickets}
              columns={columns}
              pageSize={15}
              rowsPerPageOptions={[5]}
              checkboxSelection
          />
          </div>
        </div>
    )
}

export default StaffTicketWrapper;