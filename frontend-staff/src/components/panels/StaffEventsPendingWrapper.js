import React from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { Button,Paper,InputBase,IconButton,Modal,Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import './panels.css'



const largeModelStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'white',
  border: '1px solid #adb0be',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};



const getFormattedDate = (dateString) => {
  var options = { weekday: 'long', month: 'long', day: 'numeric' };
  var date  = new Date(dateString);
  return date.toLocaleDateString("en-US", options)
}
  

function StaffPendingEventsWrapper(props) {

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
          {getClubLabel(params.value)}
      </Typography>
    },
    {
      field: 'date',
      headerName: 'Date',
      editable: false,
      width: 90,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
          {getFormattedDate(params.value)}
      </Typography>
    },
    {
      field: 'price',
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
        <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
          {"€"+params.value}
        </Typography>
      </div>
      },
      {
          field: '',
          headerName: '',
          editable: false,
          width: 150,
  
          headerClassName: 'data-grid--header',
          renderCell: (params) => <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
              <Button onClick={() => handleOpenViewDetails(params.row)} variant="contained" style={{backgroundColor:"#FF5622",height:"30px"}}>View Details</Button>
          </div>
      },
      {
          field: 'id',
          headerName: '',
          editable: false,
          width: 120,
  
          headerClassName: 'data-grid--header',
          renderCell: (params) => <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
              <Button onClick={() => props.approve([params.value])} variant="contained" style={{height:"30px"}}>Approve</Button>
          </div>
      },
    
  ];

  const getClub = (id) => {
    for(var i = 0; i < props.clubs.length; i++) {
      if(props.clubs[i].id === id) return props.clubs[i];
    }
    return null;
  } 
  const getAddress = (id) => {
    for(var i = 0; i < props.clubs.length; i++) {
      if(props.clubs[i].id === id) return props.clubs[i].address;
    }
    return null;
  } 
  const getClubLabel = (id) => {
    for(var i = 0; i < props.clubs.length; i++) {
      if(props.clubs[i].id === id) return props.clubs[i].label;
    }
    return null;
  } 
  const getGenreLabel = (id) => {
    for(var i = 0; i < props.genre.length; i++) {
      if(props.genre[i].id === id) return props.genre[i].label;
    }
    return null;
  } 

  

  const [itemSelection, setItemSelection] = React.useState([]);

  const [search,setSearch] = React.useState("")
  const [searchResults,setSearchResults] = React.useState(props.items)
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    getSearch()
    //if(event.target.value === "") getSearch();
  }
  const getSearch = () => {
    let events = props.items;
    let searchedEvents = [];

    if(search === "") {
      setSearchResults(props.items);
      return;
    } 

    for(var i = 0; i < events.length; i++) {
      if(events[i].label.toLowerCase().includes(search.toLowerCase())) searchedEvents.push(events[i]);
    }
    setSearchResults(searchedEvents)
  }




  const [details,setDetails] = React.useState({
    address: "No Address",
    api: "eventix",
    city: 1,
    club: "c08fb469-5a80-407f-bb58-09b60e0efb15",
    date: "2022-03-19",
    description: "...",
    end_time: "05:00:00",
    event_host: "c373cfa0-305f-46f4-8c4c-824e05af8e1e",
    genre: 1,
    id: "539c0f41-c4e4-4b0d-95de-c8835685b294",
    image: "https://s3.eu-central-1.amazonaws.com/cdn.wepartynow.com/default/event.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4UXCYXZVHLRXRUNN%2F20220315%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20220315T001041Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=f1d113d84838aa5894bb27ae7ce97d8bba96173dff998ba612e1a6cf7ff0b204",
    image_thumbnail_big: "https://s3.eu-central-1.amazonaws.com/cdn.wepartynow.com/default/event.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4UXCYXZVHLRXRUNN%2F20220315%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20220315T001041Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=f1d113d84838aa5894bb27ae7ce97d8bba96173dff998ba612e1a6cf7ff0b204",
    image_thumbnail_small: "https://s3.eu-central-1.amazonaws.com/cdn.wepartynow.com/default/event.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4UXCYXZVHLRXRUNN%2F20220315%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20220315T001041Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=f1d113d84838aa5894bb27ae7ce97d8bba96173dff998ba612e1a6cf7ff0b204",
    initiated_purchases: 0,
    is_active: false,
    is_pending: true,
    is_promoted: false,
    is_promoting_by_genre: false,
    is_rejected: false,
    is_sold_out: false,
    is_verified: false,
    label: "Dynasty 19-03",
    likes: 0,
    max_age: 40,
    metadata: "194f6520-1e37-11e9-be72-d74b78bb3299::60c640a4-e7b9-43ac-8ab4-5b75e85a211e::USE_FACEBOOK_COVER",
    min_age: 18,
    people: 0,
    price: "15.00",
    promotion_age_max: 0,
    promotion_age_min: 0,
    promotion_gender: "A",
    promotion_genre: [],
    purchase_link: "https://shop.eventix.io/194f6520-1e37-11e9-be72-d74b78bb3299/tickets?event=60c640a4-e7b9-43ac-8ab4-5b75e85a211e",
    revenue: "0.00",
    social_link: "https://www.facebook.com/ChinChinClubAmsterdam/",
    start_time: "21:30:00",
    verified_purchases: 0,
  })
  const [openViewDetails, setOpenViewDetails] = React.useState(false);
  const handleOpenViewDetails = (i) => {
    setDetails(i)
    setOpenViewDetails(true)
  };
  const handleCloseViewDetails = () => {
    setOpenViewDetails(false);
  }

  return(
      <div className="tall-event_panel">
        <div className="panel-header">
          <Typography sx={{fontWeight:600}} variant="h6" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
              {"Pending Events"}
          </Typography>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%", border:"1px solid #adb0be" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Events"
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
                '& .data-grid--header': {
                  color: '#adb0be',
                },
            }}
            rowHeight={40}
            style={{border:"none"}}
            rows={(search === "") ? props.items : searchResults }
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setItemSelection(newSelectionModel);
            }}
            selectionModel={itemSelection}
        />
        </div>
        <Button variant="contained" onClick={() => props.approve(itemSelection)} style={{backgroundColor:"#3552FB",float:"right"}}>Approve Selection</Button>
        <Button variant="contained" onClick={() => props.approve(itemSelection)} style={{backgroundColor:"#3552FB",float:"right",marginRight:"10px"}}>Reject Selection</Button>

        <Modal
          open={openViewDetails}
          onClose={handleCloseViewDetails}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={largeModelStyle}>
            <div>
              <CloseIcon style={{float:"right",cursor:"pointer"}} onClick={handleCloseViewDetails}/>
            </div>

            <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:"#27282B"}}>
              Approve Event
            </Typography>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
             
              <div className="add-event_panel" style={{width:"48%"}}>
                <div style={{width:"98%",height:"200px",borderRadius:"8px",backgroundImage:`url(${details.image_thumbnail_big})`,backgroundPosition:"center",backgroundSize:"cover",marginBottom:"10px"}} />
                <Typography id="modal-modal-title" variant="subtitle2" component="h2" style={{color:"rgb(255, 86, 34)"}}>
                  Event
                </Typography>
                <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginBottom:"5px"}}>
                  {details.label}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle2" component="h2" style={{color:"rgb(255, 86, 34)"}}>
                  Description
                </Typography>
                <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginBottom:"5px"}}>
                  {details.description}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle2" component="h2" style={{color:"rgb(255, 86, 34)"}}>
                  Date
                </Typography>
                <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginBottom:"5px"}}>
                  {getFormattedDate(details.date)}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle2" component="h2" style={{color:"rgb(255, 86, 34)"}}>
                  Time
                </Typography>
                <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginBottom:"5px"}}>
                  {details.start_time.substring(0,5)+" to "+details.end_time.substring(0,5)}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle2" component="h2" style={{color:"rgb(255, 86, 34)"}}>
                  Address
                </Typography>
                <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginBottom:"5px"}}>
                  {getAddress(details.club)}
                </Typography>
                
              </div>
              <div className="add-event_panel" style={{width:"48%"}}>
                <Typography id="modal-modal-title" variant="subtitle2" component="h2" style={{color:"rgb(255, 86, 34)"}}>
                  Genre
                </Typography>
                <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginBottom:"5px"}}>
                  {getGenreLabel(details.genre)}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle2" component="h2" style={{color:"rgb(255, 86, 34)"}}>
                  Age
                </Typography>
                <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginBottom:"5px"}}>
                  {details.min_age + " to " + details.max_age}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle2" component="h2" style={{color:"rgb(255, 86, 34)"}}>
                  Club
                </Typography>
                <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginBottom:"5px"}}>
                  {getClubLabel(details.club)}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle2" component="h2" style={{color:"rgb(255, 86, 34)"}}>
                  API
                </Typography>
                <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginBottom:"5px"}}>
                  {details.api}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle2" component="h2" style={{color:"rgb(255, 86, 34)"}}>
                  Ticket Price
                </Typography>
                <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginBottom:"5px"}}>
                  {"€"+details.price}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle2" component="h2" style={{color:"rgb(255, 86, 34)"}}>
                  Ticket Link
                </Typography>
                <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginBottom:"5px"}}>
                  {details.purchase_link}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle2" component="h2" style={{color:"rgb(255, 86, 34)"}}>
                  API Metadata
                </Typography>
                <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginBottom:"5px"}}>
                  {details.metadata}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle2" component="h2" style={{color:"rgb(255, 86, 34)"}}>
                  Social URL
                </Typography>
                <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginBottom:"5px"}}>
                  {details.social_link}
                </Typography>
               
              </div>

            </div>

            <Button variant="contained" onClick={() => handleCloseViewDetails()} style={{backgroundColor:"#3552FB",float:"right",marginTop:"20px"}}>Approve</Button>

          </Box>

        </Modal>

      </div>
  )
}

export default StaffPendingEventsWrapper;