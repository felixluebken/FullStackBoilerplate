import React from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import CloseIcon from '@mui/icons-material/Close';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EditIcon from '@mui/icons-material/Edit';


import './panels.css'

const slimModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'white',
  border: '1px solid #adb0be',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};
const genderChoices = [
  {
    label:"Any",
    value:"A"
  },
  {
    label:"Male",
    value:"M"
  },
  {
    label:"Female",
    value:"F"
  },
  {
    label:"Non Binary",
    value:"N"
  }
]
const genderNames = {
  "A":"Any",
  "M":"Male",
  "F":"Female",
  "N":"Non Binary",
}
  





  

function StaffEventsHotWrapper(props) {

  const columns = [
    {
      field: 'image_thumbnail_small',
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
      field: 'label',
      headerName: 'Event',
      width: 200,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#FF5622",userSelect:"none"}}>
          {params.value}
      </Typography>
    },
    {
      field: 'club',
      headerName: 'Club',
      width: 120,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
          {(getClub(params.value) === null) ? "[deleted]" : getClub(params.value).label}
      </Typography>
    },
    {
      field: 'date',
      headerName: 'Date',
      editable: false,
      width: 90,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
          {getPrettyDate(new Date(params.value))}
      </Typography>
    },
    {
      field: 'revenue',
      headerName: 'Revenue',
      editable: false,
      width: 120,
  
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
      <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
        {"€ "+params.value}
      </Typography>
    </div>
      
    },
    {
      field: 'promotion_gender',
      headerName: 'Gender',
      editable: false,
      width: 90,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
          <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="center" style={{color:"#27282B",userSelect:"none"}}>
              {genderNames[params.value]}
          </Typography>
        </div>
      
    },
    {
      field: 'id',
      headerName: 'Age',
      editable: false,
      width: 90,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
          <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="center" style={{color:"#27282B",userSelect:"none"}}>
              {getPromotionalAge(params.value)}
          </Typography>
        </div>
      
    },
    {
      field: 'promotion_genre',
      headerName: 'Genre',
      editable: false,
      width: 300,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
        <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="center" style={{color:"#27282B",userSelect:"none"}}>
          {getGenreListNames(params.value)}
        </Typography>
      </div>
      
    },
  ];

  const getPrettyDate = (date) => {
    var year = date.getFullYear()
    var month = date.getMonth()+1
    var day = date.getDate()
    if(month < 10) month = "0"+month
    if(day < 10) day = "0"+day
    return day + '/' + month + '/' + year;
  }
  const getGenre = (id) => {
    for(var i = 0; i < props.genre.length; i++) {
      if(props.genre[i].id === id) return props.genre[i]
    }
    return {
      label:"",
      value:""
    }
  }
  const getGenreListNames = (genres) => {
    let label = "";
    if(genres.length === 0) return "Any"

    for(var i = 0; i < genres.length; i++) {

      label = label + getGenre(genres[i]).label + ", "
      
    }
    
    return label
  } 
  const getClub = (id) => {
    for(var i = 0; i < props.clubs.length; i++) {
      if(props.clubs[i].id === id) return props.clubs[i]
    }
    return null
  }
  const getHotEvents = () => {

    let hotEvents = []
    let events;

    if(search === "") events = props.events
    else events = searchResults
    

    if(events) {
      for(var i = 0; i < events.length; i++) {
        if(events[i].is_promoted && events[i].is_active) hotEvents.push(events[i])
      }

    }
    
    return hotEvents
  }
  const getPromotionalAge = (id) => {
    for(var i = 0; i < props.events.length; i++) {
      if(props.events[i].id === id) return props.events[i].promotion_age_min + " - " + props.events[i].promotion_age_max
    }
    return null
  }


  const [itemSelection, setItemSelection] = React.useState([]);

  const [search,setSearch] = React.useState("")
  const [searchResults,setSearchResults] = React.useState(props.events)

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    getSearch()
    //if(event.target.value === "") getSearch();
  }
  const getSearch = () => {
    let events = props.events;
    let searchedEvents = [];

    if(search === "") {
      setSearchResults(props.events);
      return;
    } 

    for(var i = 0; i < events.length; i++) {
      if(events[i].label.toLowerCase().includes(search.toLowerCase())) searchedEvents.push(events[i]);
    }
    setSearchResults(searchedEvents)
  }


  return(
      <div className="slim-event_panel">
        <div className="panel-header">
          <Typography sx={{fontWeight:600}} variant="h6" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
              {"Hottest this week  🔥"}
          </Typography>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%", border:"1px solid #adb0be" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Hot Events"
              inputProps={{ 'aria-label': 'search events' }}
              value={search}
              onChange={handleSearchChange}
            />
            <IconButton onClick={() => getSearch()} sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        

        <div style={{ height: "360px", width: '100%' }}>
        <DataGrid
            sx={{
                width: 1,
                '& .data-grid--header': {
                  color: '#adb0be',
                },
            }}
            rowHeight={40}
            style={{border:"none"}}
            rows={getHotEvents()}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setItemSelection(newSelectionModel);
            }}
            selectionModel={itemSelection}
        />
        </div>
        <Button variant="contained" onClick={() => props.unpromoteSelection(itemSelection)} style={{backgroundColor:"#3552FB",float:"right"}}>Unpromote Selection</Button>


      </div>
  )
}

export default StaffEventsHotWrapper;