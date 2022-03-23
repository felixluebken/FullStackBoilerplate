import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ImageUpload from '../imageUpload/Uploader';
import { 
  Checkbox,MenuItem,Button,Typography,FormControlLabel,
  FormControl,FormLabel,FormGroup,Switch,Grid,List,Card,
  Divider,CardHeader,ListItem,ListItemIcon,ListItemText,
  CircularProgress,ListItemButton
} from '@mui/material';



import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import BulkImageUploader from '../imageUpload/BulkUploader';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CollectionsIcon from '@mui/icons-material/Collections';

import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';

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

const smallModelStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1250,
  bgcolor: 'white',
  border: '1px solid #adb0be',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

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

const tinyModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '1px solid #adb0be',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};




const apiChoices = [
  {
    label:"External Link",
    value:"url"
  },
  {
    label:"Eventix API",
    value:"eventix"
  },
  {
    label:"TicketApp API",
    value:"ticket_app"
  },
]
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
  

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

  

function StaffEventsWrapper(props) {

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
      field: 'start_time',
      headerName: 'From',
      editable: false,
      width: 60,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
          {params.value.slice(0, -3)}
      </Typography>
    },
    {
      field: 'end_time',
      headerName: 'To',
      editable: false,
      width: 60,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none"}}>
          {params.value.slice(0, -3)}
      </Typography>
    },
    {
      field: 'price',
      headerName: 'Price',
      sortable:false,
      editable:false,
      width: 80,
      headerClassName: 'data-grid--header',
      renderCell: (params) => <div 
        style={{
            backgroundSize:"cover",
            backgroundPosition:"center",
            width:"80px",
            height:"30px",
            borderRadius:"25px",
            border:"2px solid #1DCC99",
            display:"flex",
            justifyContent:"space-around",
            alignItems:"center"
        }}
      >
        <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
          {"€ "+params.value}
        </Typography>
      </div>,
    },
    {
      field: 'verified_purchases',
      headerName: 'Sold',
      editable: false,
      width: 60,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
        <Typography sx={{fontWeight:400}} variant="caption" noWrap component="div" align="center" style={{color:"#27282B",userSelect:"none"}}>
            {params.value}
        </Typography>
      </div>
      
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
      field: 'is_active',
      headerName: '',
      editable: false,
      width: 20,
  
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
      field: 'is_promoted',
      headerName: '',
      editable: false,
      width: 30,
  
      headerClassName: 'data-grid--header',
      renderCell: (params) => {
        if(params.value) {
          return(
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
              <LocalFireDepartmentIcon fontSize='small' style={{color:"rgb(255, 86, 34)"}} />
            </div>
  
          )
        }
        else {
          return(
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
            </div>
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
      renderCell: (params) => <IconButton onClick={() => handleOpenEditEvent(params.value)}>
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
  ];

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



  const getClub = (id) => {
    for(var i = 0; i < props.clubs.length; i++) {
      if(props.clubs[i].id === id) return props.clubs[i]
    }
    return null
  }

  const getCity = (id) => {
    for(var i = 0; i < props.cities.length; i++) {
      if(props.cities[i].id === id) return props.citties[i]
    }
    return null
  }
  const getGenre = (id) => {
    for(var i = 0; i < props.genre.length; i++) {
      if(props.genre[i].id === id) return props.genre[i]
    }
    return null
  }
  const getEvent = (id) => {
    for(var i = 0; i < props.events.length; i++) {
      if(props.events[i].id === id) return props.events[i]
    }
    return null
  }

  const getEventData = () => {
    return {
        "label": eventInput.title,
        "description": eventInput.description,
        "address": eventInput.address,
        "date": getFormattedDate(date),
        "start_time": getFormattedTime(openingTime),
        "end_time":getFormattedTime(closingTime),
        "is_sold_out":soldOut,
        "is_active":active,
        "club":eventClub,
        "genre":eventGenre,
        "city":eventCity,
        "api":eventApi,

        "price":eventInput.ticketPrice,
        "purchase_link":eventInput.ticketLink,
        "social_link":eventInput.socialLink,
        "metadata":eventInput.metadata,

        "min_age":eventInput.minAge,
        "max_age":eventInput.maxAge,

        "image":image,
    }
  }
  const getPromoteData = () => {
    let data = {
      ids:itemSelection,
      is_promoted:promoteSettings.isPromoted,
      promotion_age_min:0,
      promotion_age_max:0,
      promotion_gender:"A",
      is_promoting_by_genre:promoteSettings.genrePromoted,
      promotion_genre:[]
    }
    if(promoteSettings.agePromoted) {
      data.promotion_age_min = promoteAge.minAge;
      data.promotion_age_max = promoteAge.maxAge;
    }
    if(promoteSettings.genderPromoted) {
      data.promotion_gender = promoteGender;
    }
    if(promoteSettings.genrePromoted) {
      data.promotion_genre = right;
    }
    return data

  }


  const getPrettyDate = (date) => {
    var year = date.getFullYear()
    var month = date.getMonth()+1
    var day = date.getDate()
    if(month < 10) month = "0"+month
    if(day < 10) day = "0"+day
    return day + '/' + month + '/' + year;
  }
  const getFormattedDate = (date) => {

    var year = date.getFullYear()
    var month = date.getMonth()+1
    var day = date.getDate()
    if(month < 10) month = "0"+month
    if(day < 10) day = "0"+day
    return year + '-' + month + '-' + day;
  }
  const getFormattedTime = (time) => {
    var hours = time.getHours();
    var minutes = time.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes
  }

  const getGenreIdList = () => {
    let genreIds = []
    if(props.genre) {
      for(var i = 0; i < props.genre.length; i++) {
        genreIds.push(props.genre[i].id)
      }
    }
    return genreIds
  }
  const customList = (title, items) => {
    return(
      <Card>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={numberOfChecked(items) === items.length && items.length !== 0}
              indeterminate={
                numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{
                'aria-label': 'all items selected',
              }}
              disabled={!promoteSettings.genrePromoted}
            />
          }
          title={title}
          subheader={`${numberOfChecked(items)}/${items.length} selected`}
        />
        <Divider />
        <List
          sx={{
            width: 200,
            height: 230,
            bgcolor: 'background.paper',
            overflow: 'auto',
          }}
          dense
          component="div"
          role="list"
        >
          {items.map((item) => {

            return (
              <ListItem
                key={item}
                role="listitem"
                button
                disabled={!promoteSettings.genrePromoted}
                onClick={handleToggle(item)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(item) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': item,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={item} primary={getGenre(item).label} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Card>
    )
    
  

  }



  const handleActiveToggle = (id,currentState) => {
    console.log(id)
    
    let event = getEvent(id);
    console.log(event)
    event.is_active = !currentState
    event.image = null
    props.edit(event,id);
  }
  

  const [openAddEvents, setOpenAddEvents] = React.useState(false);
  const handleCloseAddEvents = () => setOpenAddEvents(false);
  const handleOpenAddEvents = () => {

    setEventInput({
      id:"",
      title:"",
      description:"",
      address:"",
      ticketPrice:"",
      ticketLink:"",
      socialLink:"",
      metadata:"",
  
      minAge:"",
      maxAge:"",
    })
    setEventCity(null)
    setEventGenre([])
    setEventClub(null)
    setEventCity(null)

    setActive(true)
    setSoldOut(false)

    setClosingTime(null)
    setOpeningTime(null)
    setDate(null)


    setOpenAddEvents(true);
  }


  const [openEditEvent, setOpenEditEvent] = React.useState(false);
  const [editEvent,setEditEvent] = React.useState(0)
  const handleCloseEditEvent = () => setOpenEditEvent(false);
  const handleOpenEditEvent = (id) => {

    var item = getEvent(id);
    setEditEvent(id)

    console.log(item)

    var startTimeHours = item.start_time.split(":")[0]
    var startTimeMinutes = item.start_time.split(":")[1]
    var startTimeSeconds = item.start_time.split(":")[2]

    var endTimeHours = item.end_time.split(":")[0]
    var endTimeMinutes = item.end_time.split(":")[1]
    var endTimeSeconds = item.end_time.split(":")[2]

    var eventDate = new Date(item.date)
    var eventStartTime = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), startTimeHours, startTimeMinutes, startTimeSeconds)
    var eventStartTime = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), endTimeHours, endTimeMinutes, endTimeSeconds)
    
    setEventInput({
      id:item.id,
      title: item.label,
      description: item.description,
      address: item.address,
      ticketPrice:item.price,
      ticketLink:item.purchase_link,
      socialLink:item.social_link,
      metadata:item.metadata,
  
      minAge:item.min_age,
      maxAge:item.max_age,
    })
    setEventCity(item.city)
    setEventGenre(item.genre)
    setEventClub(item.club)
    setEventCity(item.city)

    setActive(item.is_active)
    setSoldOut(item.is_sold_out)

    setClosingTime(eventStartTime)
    setOpeningTime(eventStartTime)
    setDate(eventDate)



    setOpenEditEvent(true);
  }

  const [openPromoteEvents,setOpenPromoteEvents] = React.useState(false);
  const handleClosePromoteEvents = () => setOpenPromoteEvents(false);
  const handleOpenPromoteEvents = () => {
    setLeft(getGenreIdList())
    setRight([])
    setOpenPromoteEvents(true)
  
  };



  const [date,setDate] = React.useState(null)
  const [openingTime,setOpeningTime] = React.useState(null)
  const [closingTime,setClosingTime] = React.useState(null)
  const [image,setImage] = React.useState(null);
  const [soldOut,setSoldOut] = React.useState(false)
  const [active,setActive] = React.useState(false)
  const [eventClub,setEventClub] = React.useState(null)
  const [eventGenre,setEventGenre] = React.useState([])
  const [eventCity,setEventCity] = React.useState(null)
  const [eventApi,setEventApi] = React.useState(null)

  const [eventInput, setEventInput] = React.useState({
    title:"",
    description:"",
    address:"",


    ticketPrice:"",
    ticketLink:"",
    socialLink:"",
    metadata:"",

    minAge:"",
    maxAge:"",
  });


  const handleToggleGenre = (value) => () => {
    const currentIndex = eventGenre.indexOf(value);
    const newChecked = [...eventGenre];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setEventGenre(newChecked);
  };



  const [promoteSettings, setPromoteSettings] = React.useState({isPromoted: true,agePromoted: false,genderPromoted: false,genrePromoted:false});
  const [promoteAge, setPromoteAge] = React.useState({minAge:"",maxAge:"",})
  const [promoteGender,setPromoteGender] = React.useState(null)

   

  const handlePromoteGenderChange = (event) => {setPromoteGender(event.target.value)}
  
  const handleCityChange = (event) => {setEventCity(event.target.value)} 
  const handleGenreChange = (event) => {setEventGenre(event.target.value)} 
  const handleClubChange = (event) => {setEventClub(event.target.value)} 
  const handleApiChange = (event) => {setEventApi(event.target.value)} 

  const handleActiveChange = (event) => {setActive(event.target.checked)}
  const handleSoldOutChange = (event) => {setSoldOut(event.target.checked)}
  
  const handleEventInputChange = (event) => {setEventInput({ ...eventInput, [event.target.name]: event.target.value })}

  const handlePromoteAgeChange = (event) => {setPromoteAge({ ...promoteAge, [event.target.name]: event.target.value })}
  const handlePromoteSettingsChange = (event) => {
    if(event.target.name === "isPromoted" && event.target.checked === false) setPromoteSettings({isPromoted: false,agePromoted: false,genderPromoted: false,genrePromoted:false})
    else if(event.target.name !== "isPromoted" && promoteSettings.isPromoted === false) return
    else setPromoteSettings({ ...promoteSettings, [event.target.name]: event.target.checked,})
  };

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(getGenreIdList());
  const [right, setRight] = React.useState([]);


  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };


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
    if(eventInput.title === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.description === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.address === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.ticketPrice === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.ticketLink === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.socialLink === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.metadata === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.minAge === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.maxAge === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(!date) {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(!openingTime) {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(!closingTime) {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(!eventClub) {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventGenre.length === 0) {
      handleOpenSnackbar("Please select at least one genre."); 
      return;
    }
    if(!eventCity) {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(!eventApi) {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }

    props.edit(getEventData(),editEvent);
    handleCloseEditEvent();
    setSearch("");

  }
  const checkAddInput = () => {
    console.log("checking input")
    if(eventInput.title === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.description === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.address === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.ticketPrice === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.ticketLink === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.socialLink === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.metadata === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.minAge === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventInput.maxAge === "") {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(!date) {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(!openingTime) {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(!closingTime) {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(!eventClub) {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(eventGenre.length === 0) {
      handleOpenSnackbar("Please select at least one genre."); 
      return;
    }
    if(!eventCity) {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }
    if(!eventApi) {
      handleOpenSnackbar("Please fill in all fields"); 
      return;
    }

    props.add(getEventData());
    handleCloseAddEvents();
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





  const [openAddWithEventix, setOpenAddWithEventix] = React.useState(false);
  const handleCloseAddWithEventix = () => setOpenAddWithEventix(false);
  const handleOpenAddWithEventix = () => {
    setOpenAddWithEventix(true);
  }

  const [eventixURL,setEventixURL] = React.useState("")

  const handleEventixURLChange = (event) => setEventixURL(event.target.value)


  const getEventixDate = (id) => {
    for(var i = 0; i < props.eventixData.eventDates.length; i++) {
      if(props.eventixData.eventDates[i].event_id === id) return props.eventixData.eventDates[i];
    }
  }
  const getEventixTicket = (id) => {
    for(var key of Object.keys(props.eventixData.tickets)) {
      if(props.eventixData.tickets[key].event_id === id) return props.eventixData.tickets[key];
    }
  }
  const getEventAddress = (address) => {
    let addressParts = address.split(",");
    let zipCode = addressParts[1].split(" ")[1]
    return addressParts[0] + ", " + zipCode;
  }
  const getEventClub = (clubName) => {
    for(var i = 0; i < props.clubs.length; i++) {
      if(clubName.toLowerCase() === props.clubs[i].label.toLowerCase()) return props.clubs[i]
    }
    return null
  }
  
  const getEventixData = () => {
    let urlParts = eventixURL.replace("https://","").split("/")
    props.getEventixData(urlParts[1])
  }

  const handleAddByEventix = (i) => {
    let event = props.eventixData.events[i]
    let eventDate = getEventixDate(props.eventixData.events[i].guid)
    let ticket = getEventixTicket(props.eventixData.events[i].guid)
    let shop = props.eventixData.shops[0]
    let club = getEventClub(event.location.name)

    setEventInput({
      id:"",
      title:event.name,
      description:(event.description !== null) ? event.description : "...",
      address:(club !== null) ? club.address : "",
      ticketPrice:parseFloat(ticket.min_price)/100,
      ticketLink:`https://shop.eventix.io/${shop.guid}/tickets?event=${event.guid}`,
      socialLink:(shop.facebook_page_url !== null) ? shop.facebook_page_url : "",
      metadata:`${shop.guid}::${event.guid}::USE_FACEBOOK_COVER`,
  
      minAge:"18",
      maxAge:"0",
    })
    if(club) setEventCity(club.city)
    setEventGenre([])
    setEventClub(club.id)

    setActive(true)
    setSoldOut(false)

    setClosingTime(new Date(eventDate.end))
    setOpeningTime(new Date(eventDate.start))
    setDate(new Date(eventDate.start))

    setEventApi("eventix")


    setOpenAddEvents(true);
    setOpenAddWithEventix(false);
  }



  return(
    <div className="tall-event_panel">
      <div className="panel-header">
        <Typography sx={{fontWeight:600}} variant="h6" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none"}}>
            {"All Events"}
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
          rows={(search === "") ? props.events : searchResults }
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
      <Button variant="contained" onClick={handleOpenAddWithEventix} style={{backgroundColor:"#3552FB",float:"right"}}>Add With Eventix</Button>
      <Button variant="contained" onClick={handleOpenAddEvents} style={{backgroundColor:"#3552FB",float:"right",marginRight:"20px"}}>Add Event</Button>

      <Button variant="contained" onClick={handleOpenPromoteEvents} style={{backgroundColor:"#3552FB",float:"right", marginRight:"20px"}}>Promote Selection</Button>
      <Button variant="contained" onClick={() => {props.deleteSelection(itemSelection);setSearch("");}} style={{backgroundColor:"#3552FB",float:"right", marginRight:"20px"}}>Delete Selection</Button>

      <Modal
        open={openAddWithEventix}
        onClose={handleCloseAddWithEventix}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={tinyModalStyle}>
          <div>
            <CloseIcon style={{float:"right",cursor:"pointer"}} onClick={handleCloseAddWithEventix}/>
          </div>

          <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:"#27282B"}}>
            Eventix
          </Typography>
          <div style={{width:"100%",height:"50px",marginTop:"10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <TextField
              sx={{backgroundColor:"white"}}

              name="title"
              value={eventixURL}
              onChange={handleEventixURLChange}
              label="Eventix URL"
              size="small"

            />
            <Button variant="contained" onClick={() => getEventixData()} style={{backgroundColor:"#3552FB"}}>Search</Button>
          </div>

          <Typography sx={{fontWeight:600}} variant="body2" noWrap component="div" align="left" style={{color:"#27282B",userSelect:"none",marginTop:"20px"}}>
            Select Event Below:
          </Typography>


          <div className="staff_list_container">

            <List>
              {props.eventixData.events.map((event,i) => (
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleAddByEventix(i)}>
                    <ListItemText primary={event.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

          </div>
          

          
        </Box>
      </Modal>



      <Modal
        open={openAddEvents}
        onClose={handleCloseAddEvents}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={largeModelStyle}>
          <div>
            <CloseIcon style={{float:"right",cursor:"pointer"}} onClick={handleCloseAddEvents}/>
          </div>

          <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:"#27282B"}}>
            Add Event
          </Typography>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{width:"150px"}}>
            <ImageUpload setImage={(image) => setImage(image)}/>
            <div style={{height:"20px"}} />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} className="add_genre-event_panel">
              {props.genre.map((genre) => {
                return (
                  <ListItem
                    key={genre.id}
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggleGenre(genre.id)} dense>
                      <ListItemIcon style={{minWidth:"0px"}}>
                        <Checkbox
                          style={{minWidth:"0px"}}
                          edge="start"
                          checked={eventGenre.indexOf(genre.id) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': genre.id }}
                        />
                      </ListItemIcon>
                      <ListItemText id={genre.id} primary={genre.label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            </div>
            
            <div className="add-event_panel">
            <TextField
                sx={{backgroundColor:"white",marginBottom:"10px"}}

                name="title"
                value={eventInput.title}
                onChange={handleEventInputChange}
                label="Event Title"
                size="small"

                fullWidth
              />
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px"}}

                name="description"
                value={eventInput.description}
                onChange={handleEventInputChange}
                label="Description"
                size="small"
                multiline
                rows={7}
                maxRows={7}
                fullWidth
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  name="date"
                  label="Date"
                  value={date}
                  inputFormat="dd/MM/yyyy"

                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                
                  renderInput={(params) => <TextField {...params} size="small" sx={{backgroundColor:"white",marginBottom:"10px"}} />}
                />
                <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px"}}>
                  <TimePicker
                    ampm={false}
                    name="openingTime"
                    label="Opening"
                    value={openingTime}
                    onChange={setOpeningTime}
                    renderInput={(params) => <TextField {...params} name="openingTime" size="small" sx={{backgroundColor:"white"}} />}
                  />
                  <Typography id="modal-modal-title" variant="body1" style={{color:"#27282B",margin:"5px 10px"}}>
                    to
                  </Typography>
                  <TimePicker
                    ampm={false}
                    name="closingTime"
                    label="Closing"
                    value={closingTime}
                    onChange={setClosingTime}
                    renderInput={(params) => <TextField {...params} name="closingTime" size="small" sx={{backgroundColor:"white"}} />}
                  />
                </div>
              </LocalizationProvider>

              <TextField
              sx={{backgroundColor:"white",marginBottom:"10px",width:"180px"}}

              name="city"
              value={eventCity}
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
                value={eventInput.address}
                onChange={handleEventInputChange}
                label="Address"
                size="small"
                fullWidth
              />
              
            </div>
            <div className="add-event_panel">
              <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px"}}>
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px",width:"50%"}}

                  name="minAge"
                  value={eventInput.minAge}
                  onChange={handleEventInputChange}
                  label="Min Age"
                  size="small"
                  placeholder="21"
                  type="number"
                />
                <Typography id="modal-modal-title" variant="body1" style={{color:"#27282B",margin:"5px 10px"}}>
                  to
                </Typography>
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px",width:"50%"}}

                  name="maxAge"
                  value={eventInput.maxAge}
                  onChange={handleEventInputChange}
                  label="Max Age"
                  size="small"
                  placeholder="30"
                  type="number"
                />

              </div>
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px",width:"180px"}}
                name="club"
                value={eventClub}
                onChange={handleClubChange}
                label="Club"
                size="small"
                select
              >
                {props.clubs.map((club) => (
                  <MenuItem  key={club.id} value={club.id}>
                    {club.label}
                  </MenuItem >
                ))}
              </TextField>
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px",width:"180px"}}
                name="api"
                value={eventApi}
                onChange={handleApiChange}
                label="API"
                size="small"
                select
              >
                {apiChoices.map((api) => (
                  <MenuItem  key={api.value} value={api.value}>
                    {api.label}
                  </MenuItem >
                ))}
              </TextField>
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px"}}

                name="ticketPrice"
                value={eventInput.ticketPrice}
                onChange={handleEventInputChange}
                label="Ticket Price"
                size="small"
                placeholder="15.00"
                type="number"
              />
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px"}}

                name="ticketLink"
                value={eventInput.ticketLink}
                onChange={handleEventInputChange}
                label="Ticket Link"
                size="small"
                placeholder="eventx.io/shop"
                fullWidth

              />
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px"}}

                name="metadata"
                value={eventInput.metadata}
                onChange={handleEventInputChange}
                label="API Metadata"
                size="small"
                fullWidth

              />
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px"}}

                name="socialLink"
                value={eventInput.socialLink}
                onChange={handleEventInputChange}
                label="Social URL"
                size="small"
                placeholder="instagram.com/"
              />
              <FormControlLabel style={{width:"100%"}} control={<Checkbox checked={active} onChange={handleActiveChange} />} label="Set Active" />
              <FormControlLabel style={{width:"100%"}} control={<Checkbox checked={soldOut} onChange={handleSoldOutChange} />} label="Set Sold Out" />

            </div>

          </div>

          <Button variant="contained" onClick={() => checkAddInput()} style={{backgroundColor:"#3552FB",float:"right",marginTop:"20px"}}>Add</Button>

        </Box>

      </Modal>

      <Modal
        open={openEditEvent}
        onClose={handleCloseEditEvent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={largeModelStyle}>
          <div>
            <CloseIcon style={{float:"right",cursor:"pointer"}} onClick={handleCloseEditEvent}/>
          </div>

          <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:"#27282B"}}>
            Edit Event
          </Typography>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div style={{width:"150px"}}>
            <ImageUpload setImage={(image) => setImage(image)}/>
            <div style={{height:"20px"}} />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} className="add_genre-event_panel">
              {props.genre.map((genre) => {
                return (
                  <ListItem
                    key={genre.id}
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggleGenre(genre.id)} dense>
                      <ListItemIcon style={{minWidth:"0px"}}>
                        <Checkbox
                          style={{minWidth:"0px"}}
                          edge="start"
                          checked={eventGenre.indexOf(genre.id) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': genre.id }}
                        />
                      </ListItemIcon>
                      <ListItemText id={genre.id} primary={genre.label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            </div>
            <div className="add-event_panel">
            <TextField
                sx={{backgroundColor:"white",marginBottom:"10px"}}

                name="title"
                value={eventInput.title}
                onChange={handleEventInputChange}
                label="Event Title"
                size="small"

                fullWidth
              />
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px"}}

                name="description"
                value={eventInput.description}
                onChange={handleEventInputChange}
                label="Description"
                size="small"
                multiline
                rows={7}
                maxRows={7}
                fullWidth
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  name="date"
                  label="Date"
                  value={date}
                  inputFormat="dd/MM/yyyy"
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                
                  renderInput={(params) => <TextField {...params} size="small" sx={{backgroundColor:"white",marginBottom:"10px"}} />}
                />
                <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px"}}>
                  <TimePicker
                    ampm={false}
                    name="openingTime"
                    label="Opening"
                    value={openingTime}
                    onChange={setOpeningTime}
                    renderInput={(params) => <TextField {...params} name="openingTime" size="small" sx={{backgroundColor:"white"}} />}
                  />
                  <Typography id="modal-modal-title" variant="body1" style={{color:"#27282B",margin:"5px 10px"}}>
                    to
                  </Typography>
                  <TimePicker
                    ampm={false}
                    name="closingTime"
                    label="Closing"
                    value={closingTime}
                    onChange={setClosingTime}
                    renderInput={(params) => <TextField {...params} name="closingTime" size="small" sx={{backgroundColor:"white"}} />}
                  />
                </div>
              </LocalizationProvider>

              <TextField
              sx={{backgroundColor:"white",marginBottom:"10px",width:"180px"}}

              name="city"
              value={eventCity}
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
                value={eventInput.address}
                onChange={handleEventInputChange}
                label="Address"
                size="small"
                fullWidth
              />
              
            </div>
            <div className="add-event_panel">
              <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px"}}>
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px",width:"50%"}}

                  name="minAge"
                  value={eventInput.minAge}
                  onChange={handleEventInputChange}
                  label="Min Age"
                  size="small"
                  placeholder="21"
                  type="number"
                />
                <Typography id="modal-modal-title" variant="body1" style={{color:"#27282B",margin:"5px 10px"}}>
                  to
                </Typography>
                <TextField
                  sx={{backgroundColor:"white",marginBottom:"10px",width:"50%"}}

                  name="maxAge"
                  value={eventInput.maxAge}
                  onChange={handleEventInputChange}
                  label="Max Age"
                  size="small"
                  placeholder="30"
                  type="number"
                />

              </div>
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px",width:"180px"}}
                name="club"
                value={eventClub}
                onChange={handleClubChange}
                label="Club"
                size="small"
                select
              >
                {props.clubs.map((club) => (
                  <MenuItem  key={club.id} value={club.id}>
                    {club.label}
                  </MenuItem >
                ))}
              </TextField>
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px",width:"180px"}}
                name="api"
                value={eventApi}
                onChange={handleApiChange}
                label="API"
                size="small"
                select
              >
                {apiChoices.map((api) => (
                  <MenuItem  key={api.value} value={api.value}>
                    {api.label}
                  </MenuItem >
                ))}
              </TextField>
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px"}}

                name="ticketPrice"
                value={eventInput.ticketPrice}
                onChange={handleEventInputChange}
                label="Ticket Price"
                size="small"
                placeholder="15.00"
                type="number"
              />
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px"}}

                name="ticketLink"
                value={eventInput.ticketLink}
                onChange={handleEventInputChange}
                label="Ticket Link"
                size="small"
                placeholder="eventx.io/shop"
                fullWidth

              />
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px"}}

                name="metadata"
                value={eventInput.metadata}
                onChange={handleEventInputChange}
                label="API Metadata"
                size="small"
                fullWidth

              />
              <TextField
                sx={{backgroundColor:"white",marginBottom:"10px"}}

                name="socialLink"
                value={eventInput.socialLink}
                onChange={handleEventInputChange}
                label="Social URL"
                size="small"
                placeholder="instagram.com/"
              />
              <FormControlLabel style={{width:"100%"}} control={<Checkbox checked={active} onChange={handleActiveChange} />} label="Set Active" />
              <FormControlLabel style={{width:"100%"}} control={<Checkbox checked={soldOut} onChange={handleSoldOutChange} />} label="Set Sold Out" />

            </div>

          </div>

          <Button variant="contained" onClick={() => checkEditInput()} style={{backgroundColor:"#3552FB",float:"right",marginTop:"20px"}}>Edit</Button>

        </Box>

      </Modal>



      <Modal
        open={openPromoteEvents}
        onClose={handleClosePromoteEvents}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={smallModelStyle}>
          <div>
            <CloseIcon style={{float:"right",cursor:"pointer"}} onClick={handleClosePromoteEvents}/>
          </div>

          <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:"#27282B"}}>
            Promote Events - [{itemSelection.length} selected]
          </Typography>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div className="add-event_panel" style={{width:"20%"}}>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">General</FormLabel>
              <FormGroup>

                <FormControlLabel
                  control={
                    <Switch checked={promoteSettings.isPromoted} onChange={handlePromoteSettingsChange} name="isPromoted" />
                  }
                  label="Promote"
                />
                <Divider style={{marginTop:"15px",marginBottom:"15px"}}/>

                <FormControlLabel
                  control={
                    <Switch checked={promoteSettings.agePromoted} onChange={handlePromoteSettingsChange} name="agePromoted" />
                  }
                  label="by Age" 
                />
                <FormControlLabel
                    control={
                      <Switch checked={promoteSettings.genderPromoted} onChange={handlePromoteSettingsChange} name="genderPromoted" />
                    }
                    label="by Gender"
                />
                <FormControlLabel
                    control={
                      <Switch checked={promoteSettings.genrePromoted} onChange={handlePromoteSettingsChange} name="genrePromoted" />
                    }
                    label="by Genre"
                />
              </FormGroup>
            </FormControl>
            </div>

            <div className="add-event_panel" style={{width:"78%"}}>
              <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"flex-start"}}>
                <div style={{width:"30%"}}>
                  <FormControl component="fieldset" variant="standard">
                  <FormLabel component="legend" style={{marginBottom:"10px"}}>Age Settings</FormLabel>
                  <FormGroup>

                  <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px"}}>
                      <TextField
                        sx={{backgroundColor:"white",marginBottom:"10px",width:"50%"}}

                        name="minAge"
                        value={promoteAge.minAge}
                        onChange={handlePromoteAgeChange}
                        label="Min Age"
                        size="small"
                        placeholder="21"
                        type="number"
                        disabled={!promoteSettings.agePromoted}
                      />
                      <Typography id="modal-modal-title" variant="body1" style={{color:"#27282B",margin:"5px 10px"}}>
                        to
                      </Typography>
                      <TextField
                        sx={{backgroundColor:"white",marginBottom:"10px",width:"50%"}}

                        name="maxAge"
                        value={promoteAge.maxAge}
                        onChange={handlePromoteAgeChange}
                        label="Max Age"
                        size="small"
                        placeholder="30"
                        type="number"
                        disabled={!promoteSettings.agePromoted}
                      />
                    

                    </div>
                    <Divider style={{marginTop:"15px",marginBottom:"15px"}}/>

                  </FormGroup>
                  </FormControl>

                  <FormControl component="fieldset" variant="standard" style={{width:"100%"}}>
                  <FormLabel component="legend" style={{marginBottom:"10px"}}>Gender Settings</FormLabel>
                  <FormGroup sx={{width:"100%"}}>
                    <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px",width:"100%"}}>

                      <TextField
                        sx={{backgroundColor:"white",marginBottom:"10px",width:"100%"}}

                        name="genre"
                        value={promoteGender}
                        onChange={handlePromoteGenderChange}
                        label="Select Gender"
                        size="small"
                        select
                        fullWidth
                        disabled={!promoteSettings.genderPromoted}
                      >
                        {genderChoices.map((gender) => (
                          <MenuItem  key={gender.value} value={gender.value}>
                            {gender.label}
                          </MenuItem >
                        ))}
                      </TextField>

                    </div>

                  </FormGroup>
                  </FormControl>
                </div>

                <div style={{width:"68%",marginLeft:"50px"}}>
                <FormControl component="fieldset" variant="standard">
                  <FormLabel component="legend" style={{marginBottom:"10px"}}>Genre Settings</FormLabel>
                  <FormGroup>
                  <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>{customList('Choices', left)}</Grid>
                    <Grid item>
                      <Grid container direction="column" alignItems="center">
                        <Button
                          sx={{ my: 0.5 }}
                          variant="outlined"
                          size="small"
                          onClick={handleCheckedRight}
                          disabled={leftChecked.length === 0 || !promoteSettings.genrePromoted}
                          aria-label="move selected right"
                        >
                          &gt;
                        </Button>
                        <Button
                          sx={{ my: 0.5 }}
                          variant="outlined"
                          size="small"
                          onClick={handleCheckedLeft}
                          disabled={rightChecked.length === 0 || !promoteSettings.genrePromoted}
                          aria-label="move selected left"
                        >
                          &lt;
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item>{customList('Chosen', right)}</Grid>
                  </Grid>
                  </FormGroup>
                </FormControl>
                </div>
              </div>
              
            </div>

        


          </div>

          <Button variant="contained" onClick={() => {props.promoteSelection(getPromoteData());handleClosePromoteEvents();}} style={{backgroundColor:"#3552FB",float:"right",marginTop:"20px"}}>Promote</Button>

          
          
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

export default StaffEventsWrapper;