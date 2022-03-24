import React from 'react';
import {HashRouter,Routes,Route,Link} from "react-router-dom";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Avatar from '@mui/material/Avatar';

import PieChartIcon from '@mui/icons-material/PieChart';
import PersonIcon from '@mui/icons-material/Person';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import BookIcon from '@mui/icons-material/Book';

import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import './staff.css';


import StaffDashboardPage from './StaffPages/StaffDashboard';
import StaffUserPage from './StaffPages/StaffUserPage'
import StaffVisitsPage from './StaffPages/StaffVisits';
import StaffBlogPage from './StaffPages/StaffBlogs';

const drawerWidth = 240;

const pageTitles = {
    'dashboard':'Dashboard',
    'events':'Event Management',
    'tickets':'Ticket Overview',
    'settings':'Settings',
    'city_genre':'City & Genre Management',
    'club':'Club Management',
    'blog':'Blogs',
    'users':'User Overview',
    'visits':'User Visits'
}


function StaffPanel(props) {

    React.useEffect(() => {
        document.title = `Staff Panel`;
      });


    const [currentPage,setCurrentPage] = React.useState('dashboard');
    const changePage = (page) => {
        setCurrentPage(page)
    }

    const [openUser, setOpenUser] = React.useState(false);

    const toggleUser = () => () => {
        setOpenUser(!openUser);
    };



    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    return(

        <body>
        <HashRouter>

            <div style={{position:"absolute",
                    top:(openUser) ? "78px" : "-200px",
                    right:"20px",
                    backgroundColor:"white",
                    border:"1px solid #adb0be",
                    borderRadius:"8px",
                    minWidth:"300px",
                    minHeight:"180px",
                    transition:"0.4s",
                    position:"fixed",
                    zIndex:"1000"
            }}>
                <CardContent>
                    <Typography variant="body2" noWrap component="div" align="left" style={{color:"#adb0be",userSelect:"none"}}>
                        {"Welcome back"}
                    </Typography>
                    <Typography variant="h6" noWrap component="div" align="left"style={{color:"#27282B",userSelect:"none"}}>
                        {props.userData.first_name + " " + props.userData.last_name}
                    </Typography>
                    <Divider />

                    <Typography variant="body2" noWrap component="div" align="left" style={{color:"#adb0be",userSelect:"none",marginTop:"20px"}}>
                        {props.userData.email}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size="small" style={{marginLeft:"4px"}} onClick={() => props.logout()}>Log out</Button>
                </CardActions>
            </div>


            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor:"white" }}
                >
                    <Toolbar style={{display:"flex",justifyContent:"space-between"}}>
                    <Typography sx={{fontWeight:600}} variant="h6" noWrap component="div" style={{color:"#393942",userSelect:"none"}}>
                        {pageTitles[currentPage]}
                    </Typography>

                        <div style={{display:"flex",alignContent:"center",justifyItems:"space-evenly",cursor:"pointer"}} onClick={toggleUser(true)}>
                            <Typography variant="body2" noWrap component="div" style={{color:"#393942",userSelect:"none",marginRight:"8px",marginTop:"10px"}}>
                                {props.userData.first_name + " " + props.userData.last_name}
                            </Typography>
                            <Avatar sx={{ bgcolor: '#274472' }}>{props.userData.first_name[0] + props.userData.last_name[0]}</Avatar>

                        </div>
                    </Toolbar>
                    
                </AppBar>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        backgroundColor:"#5885AF",

                        boxSizing: 'border-box',
                    },
                    }}
                    variant="permanent"
                    anchor="left"
                >

                    <div className="nav_panel-logo">
                        <div className="nav_panel-logo_img"/>
                        <Typography sx={{fontWeight:700}} variant="h5" style={{ color: '#F7F7F7', userSelect:"none" }}>Some App</Typography>
                        
                    </div>

                    <Link to="/" style={{textDecoration:"none",color:"gray"}} >
                        <ListItem button key={"dashboard"} style={{height:"60px"}} onClick={() => setCurrentPage('dashboard')}>
                            <ListItemIcon>
                                <PieChartIcon style={{color:"rgb(247, 247, 247)"}}/>
                            </ListItemIcon>
                            <ListItemText 
                            primary={<Typography variant="body2" style={{ color: 'rgb(247, 247, 247)' }}>Dashboard</Typography>} 
                            />
                        </ListItem>
                    </Link>
                    
                    <Link to="/blog" style={{textDecoration:"none",color:"gray"}} >
                        <ListItem button key={"blog"} style={{height:"60px"}} onClick={() => setCurrentPage('blog')}>
                            <ListItemIcon>
                                <BookIcon style={{color:"rgb(247, 247, 247)"}}/>
                            </ListItemIcon>
                            <ListItemText 
                            primary={<Typography variant="body2" style={{ color: 'rgb(247, 247, 247)' }}>Blogs</Typography>} 
                            />
                        </ListItem>
                    </Link>
           
                    <Link to="/users" style={{textDecoration:"none",color:"gray"}} >

                        <ListItem button key={"tickets"} style={{height:"60px"}} onClick={() => setCurrentPage('users')}>
                            <ListItemIcon>
                                <PersonIcon style={{color:"rgb(247, 247, 247)"}}/>
                            </ListItemIcon>
                            <ListItemText 
                            primary={<Typography variant="body2" style={{ color: 'rgb(247, 247, 247)' }}>Users</Typography>} 
                            />
                        </ListItem>
                    </Link>

                    <Link to="/visits" style={{textDecoration:"none",color:"gray"}} >

                        <ListItem button key={"tickets"} style={{height:"60px"}} onClick={() => setCurrentPage('visits')}>
                            <ListItemIcon>
                                <SsidChartIcon style={{color:"rgb(247, 247, 247)"}}/>
                            </ListItemIcon>
                            <ListItemText 
                            primary={<Typography variant="body2" style={{ color: 'rgb(247, 247, 247)' }}>Visits</Typography>} 
                            />
                        </ListItem>
                    </Link>


                </Drawer>
                <div className="staff_page">
                    <Routes>
                        <Route path="/" element={<StaffDashboardPage proxy={props.proxy} />}/>
                        <Route path="/blog" element={<StaffBlogPage proxy={props.proxy} />}/>
                        <Route path="/users" element={<StaffUserPage proxy={props.proxy} />}/>
                        <Route path="/visits" element={<StaffVisitsPage proxy={props.proxy} />} />
                    </Routes>  
                </div>


        
                
            </Box>

  

        </HashRouter>
        </body>


    )

}


export default StaffPanel;