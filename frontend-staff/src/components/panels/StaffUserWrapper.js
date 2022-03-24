import React from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { Delete } from '@mui/icons-material';

import './panels.css'



function StaffUserWrapper(props) {
  const getCityName = (id) => {
    for(var i = 0; i < props.cities.length; i++) {
      if(props.cities[i].id === id) return props.cities[i].label;
    }
    return null;
  } 
  const getAge = (birthday) => {
    var today = new Date();
    var birthDate = new Date(birthday);  // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    return age_now;
  }
  const getUser = (id) => {
    for(var i = 0; i < props.users.length; i++) {
      if(props.users[i].id === id) return props.users[i];
    }
    return null;
  }
  const getCleanUserData = (data) => {
    data = data.replace("(","")
    data = data.replace(")","")
    data = data.replace(",","")
    return data
  }
  
  let profiles = props.profiles
  try {
    for(var i = 0; i < profiles.length; i++) {
      profiles[i].email = getUser(profiles[i].user).email
      profiles[i].is_staff = getUser(profiles[i].user).is_staff
      profiles[i].is_active = getUser(profiles[i].user).is_active
    }
  }
  catch { 
    profiles = []
  }



  const columns = [
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: false,
        headerClassName: 'data-grid--header',
        renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
            {params.value}
        </Typography>
    },
    {
      field: 'first_name',
      headerName: 'First',
      width: 100,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#274472",userSelect:"none"}}>
          {params.value}
      </Typography>
    },
    {
      field: 'last_name',
      headerName: 'Last',
      width: 100,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#274472",userSelect:"none"}}>
        {params.value}
      </Typography>
    },
    {
      field: 'gender',
      headerName: 'Sex',
      width: 60,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
          {params.value}
      </Typography>
    },
    {
      field: 'birthday',
      headerName: 'Age',
      width: 60,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
        {getAge(params.value)}
      </Typography>
    },
    {
      field: 'is_staff',
      headerName: 'Staff',
      editable: false,
      width: 60,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => {
        if(params.value) {
          return(
            <IconButton onClick={() => handleToggleStaff(params.row.email)}>
              <CheckCircleIcon fontSize='small' style={{color:"rgb(29, 204, 153)"}} />
            </IconButton>
  
          )
        }
        else {
          return(
            <IconButton onClick={() => handleToggleStaff(params.row.email)}>
              <CancelIcon  fontSize='small' style={{color:"#880808"}} />
            </IconButton>
          )
  
        }
      }
    },
    {
      field: 'is_active',
      headerName: 'Activ',
      editable: false,
      width: 60,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => {
        if(params.value) {
          return(
            <IconButton onClick={() => handleToggleActive(params.row.email)}>
              <CheckCircleIcon fontSize='small' style={{color:"rgb(29, 204, 153)"}} />
            </IconButton>
  
          )
        }
        else {
          return(
            <IconButton onClick={() => handleToggleActive(params.row.email)}>
              <CancelIcon  fontSize='small' style={{color:"#880808"}} />
            </IconButton>
          )
  
        }
      }
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
      width: 140,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
        {getCleanUserData(params.value)}
      </Typography>
    },
    {
      field: 'id',
      headerName: '',
      editable: false,
      width: 60,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => <IconButton onClick={() => props.deleteUser(params.row.email)}>
          <Delete />
        </IconButton>
      
    },
  ];




  const handleToggleActive = (id) => props.toggleActive(id)
  const handleToggleVerified = (id) => props.toggleVerified(id)
  const handleToggleOrganizer = (id) => props.toggleOrganizer(id)
  const handleToggleStaff = (id) => props.toggleStaff(id)
  


  const [search,setSearch] = React.useState("")
  const [searchResults,setSearchResults] = React.useState(profiles)
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    getSearch()
    //if(event.target.value === "") getSearch();
  }
  const getSearch = () => {
    let searchProfiles = profiles;
    let searchedProfiles = [];

    if(search === "") {
      setSearchResults(profiles);
      return;
    } 


    for(var i = 0; i < searchProfiles.length; i++) {

      if(searchProfiles[i].email.toLowerCase().includes(search.toLowerCase())) searchedProfiles.push(searchProfiles[i]);
      else if(searchProfiles[i].first_name.toLowerCase().includes(search.toLowerCase())) searchedProfiles.push(searchProfiles[i]);
      else if(searchProfiles[i].last_name.toLowerCase().includes(search.toLowerCase())) searchedProfiles.push(searchProfiles[i]);
    }
    setSearchResults(searchedProfiles)
  }

  

  return(
      <div className="tall-event_panel" style={{height:"800px"}}>
        <div className="panel-header">
          <Typography sx={{fontWeight:600}} variant="h6" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
              {"Users"}
          </Typography>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%", border:"1px solid #adb0be" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Users"
              inputProps={{ 'aria-label': 'search events' }}
              value={search}
              onChange={handleSearchChange}
            />
            <IconButton onClick={() => getSearch()} sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div style={{ height: "740px", width: '100%' }}>
        <DataGrid
            sx={{
                width: 1,
                outline: "none !important",
                '& .data-grid--header': {
                  color: '#adb0be',
                },
            }}
            
            rowHeight={40}
            style={{border:"none"}}
            rows={(search === "") ? profiles : searchResults}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[5]}
        />
        </div>
      </div>
    )
}

export default StaffUserWrapper;