import React from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

import { TextField,Button } from '@mui/material';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';

import CloseIcon from '@mui/icons-material/Close';

import ImageUpload from '../imageUpload/Uploader';

import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';


import './panels.css'



const slimModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'white',
  border: '1px solid #adb0be',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

  

function StaffSettingsListWrapper(props) {
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
    />,
    },
    {
      field: 'label',
      headerName: props.label,
      width: 200,
      editable: false,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#FF5622",userSelect:"none"}}>
          {params.value}
      </Typography>
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
  const getItem = (id) => {
    for(var i = 0; i < props.items.length; i++) {
      if(props.items[i].id === id) return props.items[i];
    }
    return null;
  }
  
  const [openAddItem, setOpenAddItem] = React.useState(false);
  const [addItem, setAddItem] = React.useState(0);
  const handleOpenAddItem = (id) => {setAddItem(id);setOpenAddItem(true);setBanner(null);setImage(null)};
  const handleCloseAddItem = () => setOpenAddItem(false);

  const [addLabel, setAddLabel] = React.useState('');
  const handleAddLabelChange = (event) => {setAddLabel(event.target.value)};

  const [openEditItem, setOpenEditItem] = React.useState(false);
  const [editItem, setEditItem] = React.useState(0);
  const handleOpenEditItem = (id) => {setEditItem(id);setEditLabel(getItem(id).label);setOpenEditItem(true);setBanner(null);setImage(null)};
  const handleCloseEditItem = () => setOpenEditItem(false);

  const [editLabel, setEditLabel] = React.useState('');
  const handleEditLabelChange = (event) => {setEditLabel(event.target.value)};

  const [image,setImage] = React.useState(null);
  const [banner,setBanner] = React.useState(null);


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
    if(editLabel === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }

    props.edit(editItem,editLabel,image);
    handleCloseEditItem();
  }

  const checkAddInput = () => {
    console.log("checking input")
    if(addLabel === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    props.add(addLabel,image);
    handleCloseAddItem();

  }


  return(
      <div className="slim-event_panel" style={{width:"45%",height:"620px"}}>
        <div className="panel-header">
          <Typography sx={{fontWeight:600}} variant="h6" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
              {props.title}
          </Typography>
        </div>
        

        <div style={{ height: "500px", width: '100%' }}>
        <DataGrid
            sx={{
                width: 1,
                '& .data-grid--header': {
                  color: '#adb0be',
                },
            }}
            rowHeight={60}
            style={{border:"none"}}
            rows={props.items}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setItemSelection(newSelectionModel);
            }}
            selectionModel={itemSelection}
        />
        </div>
        <Button variant="contained" onClick={() => handleOpenAddItem()} style={{backgroundColor:"#3552FB",float:"right",marginLeft:"10px"}}>Add {props.label}</Button>
        <Button variant="contained" onClick={() => props.deleteSelection(itemSelection)} style={{backgroundColor:"#3552FB",float:"right"}}>Delete Selection</Button>


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
              sx={{ p: '2px 4px', width: "100%", boxShadow:"none",display:"flex",justifyContent:"center",flexWrap:"wrap"}}
            >
                
              <ImageUpload setImage={(image) => setImage(image)}/>
              
              
              <TextField id="label" label={props.label + " Name"} variant="standard" style={{margin:"10px auto",width:"100%"}} value={addLabel} onChange={handleAddLabelChange}/>
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
              Add Items
            </Typography>

            <Paper
              component="form"
              sx={{ p: '2px 4px', width: "100%", boxShadow:"none",display:"flex",justifyContent:"center",flexWrap:"wrap"}}
            >
              <ImageUpload setImage={(image) => setImage(image)}/>
              
              <TextField id="label" label={props.label + " Name"} variant="standard" style={{margin:"10px auto",width:"100%"}} value={editLabel} onChange={handleEditLabelChange}/>
            </Paper>
            <Button variant="contained" onClick={() => checkEditInput()} style={{backgroundColor:"#3552FB",float:"right"}}>Modify</Button>
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

export default StaffSettingsListWrapper;