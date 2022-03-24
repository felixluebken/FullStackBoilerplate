import React from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

import { TextField,Button,IconButton,Checkbox,InputBase  } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

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
import PushPinIcon from '@mui/icons-material/PushPin';



import './panels.css'






const slimModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 960,
  bgcolor: 'white',
  border: '1px solid #adb0be',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

  

function StaffBlogWrapper(props) {
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
      field: 'title',
      headerName: 'Title',
      width: 300,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#274472",userSelect:"none"}}>
          {params.value}
      </Typography>
    },
    {
      field: 'author',
      headerName: "Author",
      width: 200,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
          {params.value}
      </Typography>
    },
    {
      field: 'is_pinned',
      headerName: '',
      editable: false,
      width: 60,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => {
        if(params.value) {
          return(
            <IconButton onClick={() => handlePinnedToggle(params.row.id,params.value)}>
              <PushPinIcon fontSize='small' style={{color:"rgb(29, 204, 153)"}} />
            </IconButton>
  
          )
        }
        else {
          return(
            <IconButton onClick={() => handlePinnedToggle(params.row.id,params.value)}>
              <PushPinIcon  fontSize='small' style={{color:"#880808"}} />
            </IconButton>
          )
  
        }
      }
    },
    {
      field: 'is_active',
      headerName: 'Active',
      editable: false,
      width: 60,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => {
        if(params.value) {
          return(
            <IconButton onClick={() => handleToggleActive(params.row.id)}>
              <CheckCircleIcon fontSize='small' style={{color:"rgb(29, 204, 153)"}} />
            </IconButton>
  
          )
        }
        else {
          return(
            <IconButton onClick={() => handleToggleActive(params.row.id)}>
              <CancelIcon  fontSize='small' style={{color:"#880808"}} />
            </IconButton>
          )
  
        }
      }
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

  const handleToggleActive = (id) => props.toggleActive(id)

  const handlePinnedToggle = (id,currentState) => {
    let item = getItem(id)


    props.edit(id,item.title,item.author,item.body,!currentState,null);
  }

  const getItem = (id) => {
    for(var i = 0; i < props.items.length; i++) {
      if(props.items[i].id === id) return props.items[i];
    }
    return null;
  }






  const [openAddItem, setOpenAddItem] = React.useState(false);
  const handleOpenAddItem = () => {
    setOpenAddItem(true)
    setBlogInput({
        id:null,
        title:"",
        author:"",
        body:"",
    })
  };
  const handleCloseAddItem = () => setOpenAddItem(false);

  const [openEditItem, setOpenEditItem] = React.useState(false);
  const handleOpenEditItem = (id) => {
    var item = getItem(id);

    setBlogInput({
      id:item.id,
      title:item.title,
      author:item.author,
      body:item.body,
    })
    setPinned(item.is_pinned)

    setOpenEditItem(true);
  }
  const handleCloseEditItem = () => setOpenEditItem(false);


  const [image,setImage] = React.useState(null);
  const [pinned,setPinned] = React.useState(true);
  const [blogInput, setBlogInput] = React.useState({
    id:null,
    title:"",
    author:"",
    body:"",
  });
  const handleBlogInputChange = (event) => {
    setBlogInput({ ... blogInput, [event.target.name]:event.target.value})
  }
  const handlePinnedChange = (event) => {
    setPinned(event.target.checked)
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
    if(blogInput.title === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(blogInput.author === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(blogInput.body === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }

    setSearch("");
    props.edit(blogInput.id,blogInput.title,blogInput.author,blogInput.body,pinned,image);
    handleCloseEditItem();
  }
  const checkAddInput = () => {
    console.log("checking input")
    if(blogInput.title === "") {
        handleOpenSnackbar("Please fill in all fields"); 
        return;
      }
      if(blogInput.author === "") {
        handleOpenSnackbar("Please fill in all fields"); 
        return;
      }
      if(blogInput.body === "") {
        handleOpenSnackbar("Please fill in all fields"); 
        return;
      }

    props.add(blogInput.title,blogInput.author,blogInput.body,pinned,image);
    handleCloseAddItem();
    setSearch("");
  }


  const [search,setSearch] = React.useState("")
  const [searchResults,setSearchResults] = React.useState(props.items)

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    getSearch()
  }
  const getSearch = () => {
    let events = props.items;
    let searchedEvents = [];

    if(search === "") {
      setSearchResults(props.items);
      return;
    } 

    for(var i = 0; i < events.length; i++) {
      if(events[i].title.toLowerCase().includes(search.toLowerCase())) searchedEvents.push(events[i]);
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
              placeholder="Search Blogs"
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
        <Button variant="contained" onClick={() => {handleOpenAddItem()}} style={{backgroundColor:"#274472",float:"right",marginLeft:"10px"}}>Add {props.label}</Button>
        <Button variant="contained" onClick={() => {props.deleteSelection(itemSelection);setSearch("");}} style={{backgroundColor:"#274472",float:"right"}}>Delete Selection</Button>


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
              <ImageUpload setImage={(image) => setImage(image)}/>
              <div className="add-event_panel" style={{width:"80%"}}>
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px"}}

                  name="title"
                  value={blogInput.title}
                  onChange={handleBlogInputChange}
                  label="Blog Title"
                  size="small"

                  fullWidth
                />
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px"}}

                  name="author"
                  value={blogInput.author}
                  onChange={handleBlogInputChange}
                  label="Author"
                  size="small"

                />
                <TextField
                    sx={{backgroundColor:"white",marginBottom:"10px"}}

                    name="body"
                    value={blogInput.body}
                    onChange={handleBlogInputChange}
                    label="Content"
                    size="small"
                    multiline
                    rows={14}
                    maxRows={14}
                    fullWidth
                />
                
                <FormControlLabel control={<Checkbox checked={pinned} onChange={handlePinnedChange} />} label="Pinned" />
              </div>
            </Paper>
            <Button variant="contained" onClick={() => checkAddInput()} style={{backgroundColor:"#274472",float:"right"}}>Add</Button>
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
              <ImageUpload setImage={(image) => setImage(image)}/>

              <div className="add-event_panel" style={{width:"80%"}}>
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px"}}

                  name="title"
                  value={blogInput.title}
                  onChange={handleBlogInputChange}
                  label="Blog Title"
                  size="small"

                  fullWidth
                />
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px"}}

                  name="author"
                  value={blogInput.author}
                  onChange={handleBlogInputChange}
                  label="Author"
                  size="small"

                />
                <TextField
                    sx={{backgroundColor:"white",marginBottom:"10px"}}

                    name="body"
                    value={blogInput.body}
                    onChange={handleBlogInputChange}
                    label="Content"
                    size="small"
                    multiline
                    rows={14}
                    maxRows={14}
                    fullWidth
                />
                <FormControlLabel control={<Checkbox checked={pinned} onChange={handlePinnedChange} />} label="Pinned" />
              </div>
            </Paper>
            <Button variant="contained" onClick={() => checkEditInput()} style={{backgroundColor:"#274472",float:"right"}}>Modify</Button>
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

export default StaffBlogWrapper;