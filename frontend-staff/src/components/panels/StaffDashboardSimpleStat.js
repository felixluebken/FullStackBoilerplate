import React from 'react';
import Typography from '@mui/material/Typography';


import './panels.css'




function StaffDashboardSimpleStat(props) {
    return(
        <div className="small-stats_panel" onClick={props.onClick}>
                <Typography variant="h6" noWrap component="div" style={{color:"#adb0be",userSelect:"none",marginTop:"16px"}}>
                    {props.label}
                </Typography>

                <Typography variant="h3" noWrap component="div" style={{color:"#393942",userSelect:"none",marginTop:"4px"}}>
                    {props.value}
                </Typography>
        </div>
    )


}

export default StaffDashboardSimpleStat;