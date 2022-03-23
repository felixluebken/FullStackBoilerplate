import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2';
import Typography from '@mui/material/Typography';

import './panels.css'


  

function StaffDashboardGraph(props) {
    const data = {
        labels: props.labels,
        datasets: [
          {
            label: 'Users',
            data: props.data,
            backgroundColor: [
                "rgba(53, 82, 251, 0.1)",
                "rgba(53, 82, 251, 0.1)",
                "rgba(53, 82, 251, 0.1)",
                "rgba(53, 82, 251, 0.1)",
                "rgba(53, 82, 251, 0.1)",
                "rgba(53, 82, 251, 0.1)"
            ],
            borderColor: [
                "#3552FB",
                "#3552FB",
                "#3552FB",
                "#3552FB",
                "#3552FB",
                "#3552FB",
                "#3552FB"
            ],
            borderWidth: 1,
          },
        ],
      };
      

    return(
        <div className="large-stats_panel">
            <Typography variant="h5" noWrap component="div" align="left"style={{color:"#27282B",userSelect:"none",marginTop:"16px"}}>
                {props.title}
            </Typography>
            <Typography variant="body2" noWrap component="div" align="left" style={{color:"#adb0be",userSelect:"none",marginBottom:"10px"}}>
                {props.subtitle}
            </Typography>
            <Bar
                data={data}
                
            />
        </div>
    )
    
}

export default StaffDashboardGraph;