import React from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

import { TextField,Button,MenuItem,IconButton,Checkbox,InputBase } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import BulkImageUploader from '../imageUpload/BulkUploader';

import CircularProgress from '@mui/material/CircularProgress';


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';

import CloseIcon from '@mui/icons-material/Close';
import ImageUpload from '../imageUpload/Uploader';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import SearchIcon from '@mui/icons-material/Search';
import CollectionsIcon from '@mui/icons-material/Collections';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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




  

function StaffClubWrapper(props) {
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
      headerName: props.label,
      width: 150,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#FF5622",userSelect:"none"}}>
          {params.value}
      </Typography>
    },
    {
      field: 'city',
      headerName: "City",
      width: 120,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
          {(getCityName(params.value) === null) ? "[deleted]" : getCityName(params.value)}
      </Typography>
    },
    {
      field: 'address',
      headerName: "Address",
      width: 320,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
          {params.value}
      </Typography>
    },
    {
      field: 'is_active',
      headerName: '',
      editable: false,
      width: 60,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => {
        if(params.value) {
          return(
            <IconButton onClick={() => handleActiveToggle(params.row.id,params.value)}>
              <CheckCircleIcon fontSize='small' style={{color:"rgb(29, 204, 153)"}} />
            </IconButton>
  
          )
        }
        else {
          return(
            <IconButton onClick={() => handleActiveToggle(params.row.id,params.value)}>
              <CancelIcon  fontSize='small' style={{color:"#880808"}} />
            </IconButton>
          )
  
        }
      }
    },
    {
      field: '',
      headerName: '',
      editable: false,
      width: 60,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => <IconButton onClick={() => handleOpenGallery(params.row.id)}>
          <CollectionsIcon />
        </IconButton>
    },
    {
      field: 'id',
      headerName: '',
      editable: false,
      width: 60,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => <IconButton onClick={() => handleOpenEditItem(params.value)}>
          <EditIcon />
        </IconButton>
      
      
    },
  ];

  const galleryColumns = [
    {
      field: 'name',
      headerName: 'File',
      width: 500,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#FF5622",userSelect:"none"}}>
          {params.value}
      </Typography>
    },
    {
      field: 'status',
      headerName: '',
      editable: false,
      width: 60,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => getGalleryStatusIcon(params.row.id)
      
      
    },
  ]

  const getGalleryStatusIcon = (id) => {
    if(props.gallerySuccessfulUploads.includes(id)) {
      return(
        <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <CheckCircleIcon fontSize='small' style={{color:"rgb(29, 204, 153)"}} />  
        </div>
      )
    }
    else if(props.galleryFailedUploads.includes(id)) {
      return(
        <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <CancelIcon  fontSize='small' style={{color:"#880808"}} />
        </div>
      )
    }
    else if(props.galleryUploading) {
      return(
        <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <CircularProgress size={20}  />
        </div>
      )
    }
    else {
      return(
        <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <MoreHorizIcon  fontSize='small' />
        </div>
      )
    }
  }


  const handleActiveToggle = (id,currentState) => {
    let club = getClub(id)

    
    let clubData = {
      id:id,
      label:club.label,
      description:club.description,
      address:club.address,
      link:club.link,
    }

    props.edit(clubData,null,null,null,!currentState);
  }

  const getCityName = (id) => {
    for(var i = 0; i < props.cities.length; i++) {
      if(props.cities[i].id === id) return props.cities[i].label;
    }
    return null;
  } 
  const getItem = (id) => {
    for(var i = 0; i < props.items.length; i++) {
      if(props.items[i].id === id) return props.items[i];
    }
    return null;
  }
  const getClub = (id) => {
    for(var i = 0; i < props.items.length; i++) {
      if(props.items[i].id === id) return props.items[i];
    }
    return null;
  } 

  
  const [openAddItem, setOpenAddItem] = React.useState(false);
  const handleOpenAddItem = () => {
    setOpenAddItem(true)
    setBanner(null);
    setImage(null)
    setClubInput({
      id:null,
      label:"",
      description:"",
      address:"",
      link:"",
    })
  };
  const handleCloseAddItem = () => setOpenAddItem(false);

  const [openEditItem, setOpenEditItem] = React.useState(false);
  const handleOpenEditItem = (id) => {
    var item = getItem(id);

    setClubInput({
      id:item.id,
      label: item.label,
      description: item.description,
      address: item.address,
      link: item.link,
    })
    setCity(item.city)
    setActive(item.is_active)
    setBanner(null);
    setImage(null)

    setOpenEditItem(true);
  }
  const handleCloseEditItem = () => {setOpenEditItem(false)};


  const [image,setImage] = React.useState(null);
  const [banner,setBanner] = React.useState(null);

  const [active,setActive] = React.useState(true);
  const [city,setCity] = React.useState(1);
  const [clubInput, setClubInput] = React.useState({
    id:null,
    label:"",
    description:"",
    address:"",
    link:"",
  });
  const handleClubInputChange = (event) => {
    setClubInput({ ... clubInput, [event.target.name]:event.target.value})
  }
  const handleCityChange = (event) => {
    setCity(event.target.value)
  } 
  const handleActiveChange = (event) => {
    setActive(event.target.checked)
  }

  const [itemSelection, setItemSelection] = React.useState([]);


  const [snackBarOpen,setSnackbarOpen] = React.useState(false);
  const [snackBarText,setSnackbarText] = React.useState("");

  const handleOpenSnackbar = (text) => {
    setSnackbarOpen(true)
    setSnackbarText(text)
  }
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
    setSnackbarText("")
  }



  const checkEditInput = () => {
    console.log("checking input")
    if(clubInput.label === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(clubInput.description === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(clubInput.address === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(clubInput.link === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    setSearch("");
    props.edit(clubInput,image,banner,city,active);
    handleCloseEditItem();
  }
  const checkAddInput = () => {
    console.log("checking input")
    if(clubInput.label === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(clubInput.description === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(clubInput.address === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(clubInput.link === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }

    props.add(clubInput,image,banner,city,active);
    handleCloseAddItem();
    setSearch("");
  }


  const [galleryClubId,setGalleryClubId] = React.useState(null)
  const [gallery,setGallery] = React.useState(null)
  const handleSetGallery = (images) => {
    let imageList = []
    for(var i = 0; i < images.length; i++) {
      imageList.push({
        id:i,
        file:images[i],
        name:images[i].name,
        status:false
      })
    }
    setGallery(imageList)
  }
  const handleUploadGallery = () =>  {
    props.setGallery(galleryClubId,gallery)
  }

  const [openGallery, setOpenGallery] = React.useState(false);
  const handleOpenGallery = (id) => {
    props.getGallery(id)
    props.resetGalleryUploadState()
    setGalleryClubId(id)
    setGallery(null)
    setOpenGallery(true);
  }
  const handleCloseGallery = () => {setOpenGallery(false)};

  





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

  

  return(
      <div className="slim-event_panel" style={{width:"100%",height:"620px"}}>
        <div className="panel-header">
          <Typography sx={{fontWeight:600}} variant="h6" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
              {props.title}
          </Typography>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%", border:"1px solid #adb0be" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Clubs"
              inputProps={{ 'aria-label': 'search events' }}
              value={search}
              onChange={handleSearchChange}
            />
            <IconButton onClick={() => getSearch()} sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        

        <div style={{ height: "500px", width: '100%' }}>
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
            pageSize={9}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setItemSelection(newSelectionModel);
            }}
            selectionModel={itemSelection}
        />
        </div>
        <Button variant="contained" onClick={() => {handleOpenAddItem()}} style={{backgroundColor:"#3552FB",float:"right",marginLeft:"10px"}}>Add {props.label}</Button>
        <Button variant="contained" onClick={() => {props.deleteSelection(itemSelection);setSearch("");}} style={{backgroundColor:"#3552FB",float:"right"}}>Delete Selection</Button>


        <Modal
          open={openAddItem}
          onClose={handleCloseAddItem}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={slimModalStyle}>
            <div>
              <CloseIcon style={{float:"right",cursor:"pointer"}} onClick={handleCloseAddItem}/>
            </div>

            <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:"#27282B",marginBottom:"10px"}}>
              Add Items
            </Typography>

            <Paper
              component="form"
              sx={{ p: '2px 4px', width: "100%", boxShadow:"none",display:"flex",justifyContent:"space-between",flexWrap:"wrap",marginBottom:"10px"}}
            >
              <div>
                <ImageUpload setImage={(image) => setImage(image)}/>
                <Typography variant="subtitle2" align="center" component="h2" style={{color:"#27282B",margin:"10px"}}>
                  Thumbnail
                </Typography>
                <ImageUpload setImage={(image) => setBanner(image)}/>
                <Typography variant="subtitle2" align="center" component="h2" style={{color:"#27282B",margin:"10px"}}>
                  Banner
                </Typography>
              </div>
              
              <div className="add-event_panel" style={{width:"73%"}}>
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px"}}

                  name="label"
                  value={clubInput.label}
                  onChange={handleClubInputChange}
                  label="Title"
                  size="small"

                  fullWidth
                />
                <TextField
                    sx={{backgroundColor:"white",marginBottom:"10px"}}

                    name="description"
                    value={clubInput.description}
                    onChange={handleClubInputChange}
                    label="Description"
                    size="small"
                    multiline
                    rows={7}
                    maxRows={7}
                    fullWidth
                  />
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px",width:"180px"}}

                  name="city"
                  value={city}
                  onChange={handleCityChange}
                  label="City"
                  size="small"
                  select
                  
                >
                  {props.cities.map((city) => (
                    <MenuItem  key={city.id} value={city.id}>
                      {city.label}
                    </MenuItem >
                  ))}
                </TextField>
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px"}}

                  name="address"
                  value={clubInput.address}
                  onChange={handleClubInputChange}
                  label="Address"
                  size="small"

                  fullWidth
                />
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px"}}

                  name="link"
                  value={clubInput.link}
                  onChange={handleClubInputChange}
                  label="Club URL"
                  size="small"

                  fullWidth
                />
                <FormControlLabel control={<Checkbox checked={active} onChange={handleActiveChange} />} label="Set Active" />
              </div>
            </Paper>
            <Button variant="contained" onClick={() => checkAddInput()} style={{backgroundColor:"#3552FB",float:"right"}}>Add</Button>
          </Box>
        </Modal>


        <Modal
          open={openEditItem}
          onClose={handleCloseEditItem}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={slimModalStyle}>
            <div>
              <CloseIcon style={{float:"right",cursor:"pointer"}} onClick={handleCloseEditItem}/>
            </div>

            <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:"#27282B",marginBottom:"10px"}}>
              Edit Item
            </Typography>

            <Paper
              component="form"
              sx={{ p: '2px 4px', width: "100%", boxShadow:"none",display:"flex",justifyContent:"space-between",flexWrap:"wrap",marginBottom:"10px"}}
            >
              <div>
                <ImageUpload setImage={(image) => setImage(image)}/>
                <Typography variant="subtitle2" align="center" component="h2" style={{color:"#27282B",margin:"10px"}}>
                  Thumbnail
                </Typography>
                <ImageUpload setImage={(image) => setBanner(image)}/>
                <Typography variant="subtitle2" align="center" component="h2" style={{color:"#27282B",margin:"10px"}}>
                  Banner
                </Typography>
              </div>
              

              <div className="add-event_panel" style={{width:"73%"}}>
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px"}}

                  name="label"
                  value={clubInput.label}
                  onChange={handleClubInputChange}
                  label="Title"
                  size="small"

                  fullWidth
                />
                <TextField
                    sx={{backgroundColor:"white",marginBottom:"10px"}}

                    name="description"
                    value={clubInput.description}
                    onChange={handleClubInputChange}
                    label="Description"
                    size="small"
                    multiline
                    rows={7}
                    maxRows={7}
                    fullWidth
                  />
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px",width:"180px"}}

                  name="city"
                  value={city}
                  onChange={handleCityChange}
                  label="City"
                  size="small"
                  select
                  
                >
                  {props.cities.map((city) => (
                    <MenuItem  key={city.id} value={city.id}>
                      {city.label}
                    </MenuItem >
                  ))}
                </TextField>
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px"}}

                  name="address"
                  value={clubInput.address}
                  onChange={handleClubInputChange}
                  label="Address"
                  size="small"

                  fullWidth
                />
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px"}}

                  name="link"
                  value={clubInput.link}
                  onChange={handleClubInputChange}
                  label="Club URL"
                  size="small"

                  fullWidth
                />
                <FormControlLabel control={<Checkbox checked={active} onChange={handleActiveChange} />} label="Set Active" />
              </div>
            </Paper>
            <Button variant="contained" onClick={() => checkEditInput()} style={{backgroundColor:"#3552FB",float:"right"}}>Modify</Button>
          </Box>
        </Modal>


        <Modal
          open={openGallery}
          onClose={handleCloseGallery}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={slimModalStyle}>
            <div>
              <CloseIcon style={{float:"right",cursor:"pointer"}} onClick={handleCloseGallery}/>
            </div>

            <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:"#27282B",marginBottom:"10px"}}>
              Manage Gallery [{props.gallery.length} images active]
            </Typography>

            <Paper
              component="form"
              sx={{ p: '2px 4px', width: "100%", boxShadow:"none",display:"flex",alignItems:"center",justifyContent:"center"}}
            >
              {(gallery === null) ? 
                <BulkImageUploader setImage={(images) => handleSetGallery(images)} /> :
                <div style={{ height: "600px", width: '100%' }}>
                  <DataGrid
                    sx={{
                        width: 1,
                        '& .data-grid--header': {
                          color: '#adb0be',
                        },
                    }}
                    rowHeight={60}
                    style={{border:"none"}}
                    rows={gallery}
                    columns={galleryColumns}
                    pageSize={8}
                  />
                </div>
                
            
              }
              
              
            </Paper>
            {(gallery !== null && !props.galleryUploading) ? 
              <Button variant="contained" onClick={() => handleUploadGallery()} style={{backgroundColor:"#3552FB",float:"right"}}>Upload</Button> :
              <div></div>
            }
            {(gallery !== null && !props.galleryUploading) ? 
              <Button variant="contained" onClick={() => {props.clearGallery(galleryClubId);setGallery(null)}} style={{backgroundColor:"#3552FB",float:"right",marginRight:"10px"}}>Clear</Button> :
              <div></div>
            }
          </Box>
        </Modal>


        <Snackbar
            open={snackBarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackBarText}
        />
      </div>
  )
}

export default StaffClubWrapper;