import React, {Component} from 'react'
import {Line} from 'react-chartjs-2';
import Typography from '@mui/material/Typography';

import './panels.css'


  

function StaffDashboardGraph(props) {

    const data = {
        labels: props.labels,
        datasets: [
          {
            label: props.labelValue,
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(53, 82, 251, 0.1)',
            borderColor: '#3552FB',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#3552FB',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#3552FB',
            pointHoverBorderColor: '#3552FB',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.data,
          }
        ]
      };
    
    const lineOptions = {
        scales: {
            xAxes: [{
            gridLines: {
                display: false,
            },
            ticks: {
                fontColor:"#adb0be",
            }
            }],
            yAxes: [{
            // stacked: true,
            gridLines: {
                display: false,
            },
            ticks: {
                beginAtZero: true,
                fontColor:"#adb0be",
                // Return an empty string to draw the tick line but hide the tick label
                // Return `null` or `undefined` to hide the tick line entirely
                userCallback(value) {
                // Convert the number to a string and splite the string every 3 charaters from the end
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);

                // Convert the array to a string and format the output
                value = value.join('.');
                return `${value}`;
                },
            },
            }],
        },
        legend: {
            display: false,
        },
        tooltips: {
            enabled: true,
        },
    };

    return(
        <div className="large-stats_panel">
            <Typography variant="h5" noWrap component="div" align="left"style={{color:"#27282B",userSelect:"none",marginTop:"16px"}}>
                {props.title}
            </Typography>
            <Typography variant="body2" noWrap component="div" align="left" style={{color:"#adb0be",userSelect:"none",marginBottom:"10px"}}>
                {props.subtitle}
            </Typography>
            <Line data={data} options={lineOptions} /> 
        </div>
    )
    
}

export default StaffDashboardGraph;