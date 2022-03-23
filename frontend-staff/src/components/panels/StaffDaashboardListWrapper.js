import React from 'react';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


import './panels.css'


function StaffDashboardListWrapper(props) {
    let items;
    let list;

    if(props.items) {
        items = props.items;
    } 
    else {
        items = []
    }


    if(props.type === "price") {

        list = <List>
            {
                items.map((item) => {
                    return(
                    <div>
                    <ListItem>
                        <ListItemText primary={item.label} />
                        <Typography sx={{fontWeight:600}} variant="body1" noWrap component="div" align="left" style={{color:"#393942",userSelect:"none",marginBottom:"10px"}}>
                            {item.value}
                        </Typography>
                        
                    </ListItem>
                    <Divider />
                    </div>
                    
                    
                    )
                })
            }
        </List>
    
    }
    else {
        list = <List>
            {
                items.map((item) => {
                    return(
                    <div>
                    <ListItem>
                        <ListItemText primary={item.label} />
                        <Typography variant="body2" noWrap component="div" align="left" style={{color:"#adb0be",userSelect:"none",marginBottom:"10px"}}>
                            {item.value}
                        </Typography>
                        
                    </ListItem>
                    <Divider />
                    </div>
                    
                    
                    )
                })
            }

        </List>
    
    }

    

    return(
        <div className="list-stats_panel">
            <div className="panel-header">
            <Typography variant="h5" noWrap component="div" align="left"style={{color:"#27282B",userSelect:"none"}}>
                {props.title}
            </Typography>
            <Link to={props.link} style={{textDecoration:"none"}}>
                <Typography sx={{fontWeight:600}} variant="body2" noWrap component="div" align="left" style={{color:"#3552FB",cursor:"pointer"}}>
                    View details
                </Typography>
            </Link>
            
            </div>
            {list}
        </div>
    )


}

export default StaffDashboardListWrapper;