import React from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import './panels.css'



function StaffVisitsWrapper(props) {

  const getCleanUserData = (data) => {
    data = data.replace("(","")
    data = data.replace(")","")
    data = data.replace(",","")
    return data
  }

  const getCleanDateTime = (dateTime) => {
    var date = new Date(dateTime)
    return date.toLocaleString()
  }
  


  const columns = [
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      width: 150,
      editable: false,
      
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
          {getCleanDateTime(params.value)}
      </Typography>
  },
    {
        field: 'user',
        headerName: 'Email',
        width: 200,
        editable: false,
        headerClassName: 'data-grid--header',
        renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
            {params.value}
        </Typography>
    },

    {
      field: 'ip',
      headerName: 'IP Address',
      width: 120,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
          {getCleanUserData(params.value)}
      </Typography>
    },
    {
      field: 'os',
      headerName: 'Device',
      width: 120,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
        {getCleanUserData(params.value)}
      </Typography>
    },
    {
      field: 'device',
      headerName: 'Browser',
      width: 120,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
        {getCleanUserData(params.value)}
      </Typography>
    },
    {
      field: 'ua',
      headerName: 'User Agent',
      width: 600,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
        {getCleanUserData(params.value)}
      </Typography>
    },
  ];

  console.log(props.visits)

  return(
      <div className="tall-event_panel" style={{height:"800px"}}>
        <div className="panel-header">
          <Typography sx={{fontWeight:600}} variant="h6" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
              {"Visits"}
          </Typography>

        </div>
        <div style={{ height: "740px", width: '100%' }}>
        <DataGrid
            sx={{
                width: 1,
                '& .data-grid--header': {
                  color: '#adb0be',
                },
            }}
            initialState={{
              sorting: {
                sortModel: [{ field: 'timestamp', sort: 'desc' }],
              },
            }}
            rowHeight={40}
            style={{border:"none"}}
            rows={props.visits}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[5]}
        />
        </div>
      </div>
    )
}

export default StaffVisitsWrapper;