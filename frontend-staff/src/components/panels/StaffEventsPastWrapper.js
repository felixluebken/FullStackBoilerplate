import React from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';

import CloseIcon from '@mui/icons-material/Close';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import './panels.css'


const slimModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'white',
  border: '1px solid #adb0be',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};



const columns = [
  {
    field: 'image',
    headerName: '',
    sortable:false,
    editable:false,
    width: 70,
    headerClassName: 'data-grid--header',
    renderCell: (params) => <div 
      style={{
          backgroundImage:`url(${params.value})`,
          backgroundSize:"cover",
          backgroundPosition:"center",
          width:"50px",
          height:"50px",
          borderRadius:"5px"
      }}
      src={params.value} 
    />,
  },
  {
    field: 'eventName',
    headerName: 'Event',
    width: 300,
    editable: false,
    headerClassName: 'data-grid--header',
    renderCell: (params) => <Typography sx={{fontWeight:600}} variant="body2" noWrap component="div" align="left" style={{color:"#FF5622",userSelect:"none"}}>
        {params.value}
    </Typography>
  },
  {
    field: 'eventClub',
    headerName: 'Club',
    width: 150,
    editable: false,
    headerClassName: 'data-grid--header',
    renderCell: (params) => <Typography sx={{fontWeight:600}} variant="body2" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
        {params.value}
    </Typography>
  },
  {
    field: 'eventDate',
    headerName: 'Date',
    editable: false,
    width: 250,

    headerClassName: 'data-grid--header',
    renderCell: (params) => <Typography sx={{fontWeight:600}} variant="body2" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
        {params.value}
    </Typography>
  },
  {
    field: 'ticketPrice',
    headerName: 'Ticket Price',
    sortable:false,
    editable:false,
    width: 120,
    headerClassName: 'data-grid--header',
    renderCell: (params) => <div 
      style={{
          backgroundSize:"cover",
          backgroundPosition:"center",
          width:"100px",
          height:"35px",
          borderRadius:"25px",
          border:"2px solid #1DCC99",
          display:"flex",
          justifyContent:"space-around",
          alignItems:"center"
      }}
    >
      <Typography sx={{fontWeight:600}} variant="body2" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
        {"€"+params.value}
      </Typography>
    </div>,
  },
  {
    field: 'ticketsSold',
    headerName: 'Sold',
    editable: false,
    width: 80,

    headerClassName: 'data-grid--header',
    renderCell: (params) => <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
      <Typography sx={{fontWeight:600}} variant="body2" noWrap component="div" align="center" style={{color:"#27282B",userSelect:"none"}}>
          {params.value}
      </Typography>
    </div>
    
  },
  {
    field: 'totalRevenue',
    headerName: 'Revenue',
    editable: false,
    width: 120,

    headerClassName: 'data-grid--header',
    renderCell: (params) => <div 
      style={{
          backgroundSize:"cover",
          backgroundPosition:"center",
          width:"100px",
          height:"35px",
          borderRadius:"25px",
          backgroundColor:"#1DCC99",
          display:"flex",
          justifyContent:"space-around",
          alignItems:"center"
      }}
    >
    <Typography sx={{fontWeight:600}} variant="body2" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
      {"€"+params.value}
    </Typography>
  </div>
    
  },
  {
    field: 'isActive',
    headerName: '',
    editable: false,
    width: 60,

    headerClassName: 'data-grid--header',
    renderCell: (params) => {
      if(params.value) {
        return(
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
            <CheckCircleIcon  />
          </div>

        )
      }
      else {
        return(
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
            <CancelIcon  />
          </div>
        )

      }
    }
    
  },
];

const rows = [
{ 
  id: 1, 
  image:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  eventName:"Event 1",
  eventClub:"Nyx",
  eventCity:"Amsterdam",
  eventAddress:"123 Street",
  eventDate:"12th December 2022",
  eventTime:"15:00",
  ticketPrice:"15.00",
  ticketsSold:"25",
  totalRevenue:"600",
  isPromoted:true,
  isActive:false,
}
];

  

function StaffEventsPastWrapper(props) {

    return(
        <div className="tall-event_panel">
          <div className="panel-header">
            <Typography sx={{fontWeight:600}} variant="h6" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
                {"Past / Inactive Events"}
            </Typography>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%", border:"1px solid #adb0be" }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Events"
                inputProps={{ 'aria-label': 'search events' }}
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
              rowHeight={60}
              style={{border:"none"}}
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              checkboxSelection
          />
          </div>
        </div>
    )
}

export default StaffEventsPastWrapper;