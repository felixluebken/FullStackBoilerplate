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

    list = <List>
        {
            items.map((item) => {
                return(
                <div>
                <ListItem>
                    <ListItemText primary={item.fields.first_name+" "+item.fields.last_name} />
                    <Typography variant="body2" noWrap component="div" align="left" style={{color:"#adb0be",userSelect:"none",marginBottom:"10px"}}>
                        {item.fields.birthday}
                    </Typography>
                    
                </ListItem>
                <Divider />
                </div>
                
                
                )
            })
        }

    </List>
    
    

    

    return(
        <div className="list-stats_panel">
            <div className="panel-header">
            <Typography variant="h5" noWrap component="div" align="left"style={{color:"#27282B",userSelect:"none"}}>
                {props.title}
            </Typography>
            <Link to={props.link} style={{textDecoration:"none"}}>
                <Typography sx={{fontWeight:600}} variant="body2" noWrap component="div" align="left" style={{color:"#274472",cursor:"pointer"}}>
                    View details
                </Typography>
            </Link>
            
            </div>
            {list}
        </div>
    )


}

export default StaffDashboardListWrapper;