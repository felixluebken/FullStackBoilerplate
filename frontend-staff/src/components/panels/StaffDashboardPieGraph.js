import React, {Component} from 'react'
import {Line,Pie} from 'react-chartjs-2';
import Typography from '@mui/material/Typography';

import './panels.css'


  

function StaffDashboardGraph(props) {
    const data = {
        labels: props.labels,
        datasets: [
          {
            label: 'gender',
            data: props.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
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
            <Pie
                data={data}
                
            />
        </div>
    )
    
}

export default StaffDashboardGraph;