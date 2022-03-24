
import React, {Component} from 'react';
import axios from 'axios';
import { Rings } from 'react-loader-spinner';


import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import StaffDashboardSimpleStat from "../../components/panels/StaffDashboardSimpleStat";
import StaffDashboardListWrapper from '../../components/panels/StaffDashboardUserListWrapper';

import StaffDashboardBarGraph from "../../components/panels/StaffDashboardBarGraph"
import StaffDashboardPieGraph from "../../components/panels/StaffDashboardPieGraph"
import StaffDashboardGraph from "../../components/panels/StaffDashboardGraph";






const dataTypeLabels = {
    totalEvents: "Total Events",
    ticketsSold: "Tickets Sold",
    totalVisitors: "Total Visitors",
    revenue:"Revenue"
}




class StaffDashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                "general_stats": {
                    "web_visits": {},
                    "events": {},
                    "tickets": {},
                    "revenue":{}
                },
                "user_stats": {
                    "gender": {},
                    "age": {},
                    "users":[],
                }
            },
            timeFrame:'week',
            dataType:'totalVisitors',
            isLoading:true
        }
    }
    handleTimeFrameChange = (event) => {
        this.setState({
            timeFrame: event.target.value
        })
    }
    handleDataTypeChange = (value) => {
        this.setState({
            dataType: value
        })
    }



    getGenderData = () => {
        let genderData = [];

        // DO OPERATIONS HERE

        return genderData
    }
    getAgeData = () => {
        let ageData = [];
        let sum = 0

        for(var i = 18; i < 22; i++) {
            sum = sum + this.state.data.user_stats.age[i]
        }
        ageData.push(sum); sum = 0

        for(var i = 22; i < 27; i++) {
            sum = sum + this.state.data.user_stats.age[i]
        }
        ageData.push(sum); sum = 0

        for(var i = 27; i < 31; i++) {
            sum = sum + this.state.data.user_stats.age[i]
        }
        ageData.push(sum); sum = 0

        for(var i = 31; i < 34; i++) {
            sum = sum + this.state.data.user_stats.age[i]
        }
        ageData.push(sum); sum = 0

        for(var i = 34; i < 41; i++) {
            sum = sum + this.state.data.user_stats.age[i]
        }
        ageData.push(sum); sum = 0

        for(var i = 41; i < 51; i++) {
            sum = sum + this.state.data.user_stats.age[i]
        }
        ageData.push(sum); sum = 0

        for(var i = 51; i < 60; i++) {
            sum = sum + this.state.data.user_stats.age[i]
        }
        ageData.push(sum); sum = 0

        return ageData
    }

    formatDate = (date) => {
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        
        return yyyy + '-' + mm + '-' + dd;
    }

    prettyDate = (date) => {
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        
        return mm + '/' + dd;
    }




    getWeekData = (dataset) => {
        let today = new Date()
        let labels = []
        let values = []
        let sum = 0

        for(var i = 6; i >=  0; i--) {
            let date = new Date(today.getFullYear(), today.getMonth(), today.getDate()-i)
            let formattedDate = this.formatDate(date)
            let dateItem = date.getDay()

            switch(dateItem) {
                case 0: labels.push("Sun");break;
                case 1: labels.push("Mon");break;
                case 2: labels.push("Tue");break;
                case 3: labels.push("Wed");break;
                case 4: labels.push("Thu");break;
                case 5: labels.push("Fri");break;
                case 6: labels.push("Sat");break;
            }
            
            if(dataset.hasOwnProperty(formattedDate)) {
                values.push(dataset[formattedDate]);
                sum = sum + dataset[formattedDate]
            }
            else {
                values.push(0);
            }
            
        }
        return {
            values:values,
            labels:labels,
            sum:sum
        };
    }
    getMonthData = (dataset) => {
        let today = new Date()
        let labels = []
        let values = []
        let sum = 0

        for(var i = 31; i >=  0; i--) {
            let date = new Date(today.getFullYear(), today.getMonth(), today.getDate()-i)
            let formattedDate = this.formatDate(date)
            labels.push(this.prettyDate(date))
            
            if(dataset.hasOwnProperty(formattedDate)) {
                values.push(dataset[formattedDate]);
                sum = sum + dataset[formattedDate]
            }
            else {
                values.push(0);
            }
            
        }
        return {
            values:values,
            labels:labels,
            sum:sum
        };
    }
    getYearData = (dataset) => {
        let today = new Date()
        let labels = []
        let values = [0,0,0,0,0,0,0,0,0,0,0,0]
        let sum = 0

        for(var i = 11; i >=  0; i--) {
            let date = new Date(today.getFullYear(), today.getMonth()-i)
            let formattedDate = this.formatDate(date).substring(0,7)
            var dateItem = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            
            switch(dateItem) {
                case "01": labels.push("Jan");break;
                case "02": labels.push("Feb");break;
                case "03": labels.push("Mar");break;
                case "04": labels.push("Apr");break;
                case "05": labels.push("May");break;
                case "06": labels.push("Jun");break;
                case "07": labels.push("Jul");break;
                case "08": labels.push("Aug");break;
                case "09": labels.push("Seb");break;
                case "10": labels.push("Oct");break;
                case "11": labels.push("Nov");break;
                case "12": labels.push("Dec");break;
            }


            for (const [key, value] of Object.entries(dataset)) {

                if(key.substring(0,7) === formattedDate) {
                    sum = sum + value
                    values[i] = values[i] + value
                }
            }
            

        }


        return {
            values:values.reverse(),
            labels:labels,
            sum:sum
        };
    }







    getOverview = (dataType) => {
        let dataset;
        let sum

        switch(dataType) {
            case "totalVisitors": dataset = this.state.data.general_stats.web_visits; break;
            case "totalEvents": dataset = this.state.data.general_stats.events; break;
            case "ticketsSold": dataset = this.state.data.general_stats.tickets; break;
            case "revenue": dataset = this.state.data.general_stats.revenue; break;
        }

        switch(this.state.timeFrame) {
            case "week": sum = this.getWeekData(dataset).sum; break;
            case "month": sum = this.getMonthData(dataset).sum; break;
            case "year": sum = this.getYearData(dataset).sum; break;
        }
        return sum;
    }
    getGraphLabels = () => {
        let labels = [];
        let dataset;


        switch(this.state.dataType) {
            case "totalVisitors": dataset = this.state.data.general_stats.web_visits; break;
            case "totalEvents": dataset = this.state.data.general_stats.events; break;
            case "ticketsSold": dataset = this.state.data.general_stats.tickets; break;
            case "revenue": dataset = this.state.data.general_stats.revenue; break;
        }

        switch(this.state.timeFrame) {
            case "week": labels = this.getWeekData(dataset).labels; break;
            case "month": labels = this.getMonthData(dataset).labels; break;
            case "year": labels = this.getYearData(dataset).labels; break;
        }

        return labels
    }
    getGraphData = () => {
        let values = [];
        let dataset;

        switch(this.state.dataType) {
            case "totalVisitors": dataset = this.state.data.general_stats.web_visits; break;
            case "totalEvents": dataset = this.state.data.general_stats.events; break;
            case "ticketsSold": dataset = this.state.data.general_stats.tickets; break;
            case "revenue": dataset = this.state.data.general_stats.revenue; break;
        }

        switch(this.state.timeFrame) {
            case "week": values = this.getWeekData(dataset).values; break;
            case "month": values = this.getMonthData(dataset).values; break;
            case "year": values = this.getYearData(dataset).values; break;
        }

        return values
    }



    componentDidMount() {

        this.refreshData();
    }

    refreshData = () => {
        axios
            .get(this.props.proxy+"staff/dashboard/",
            {
                headers: {
                    'Authorization': localStorage.getItem('access_token')
                            ? 'Bearer ' + localStorage.getItem('access_token')
                            : null,
                    'Content-Type': 'application/json',
                    'accept':'application/json'
                }
            })
            .then((res) => {
                this.setState({data:res.data.data,isLoading:false})
            })
            .catch((err) => {this.handleOpenSnackbar("something went wrong");console.log(err)})
    }



    render() {
        
        if(this.state.isLoading) {
            return(
                <div
                    style={{
                        width: "100%",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Rings color="#274472" height="200" width="200" />
                </div>
            )
        }
        return(
            <div style={{marginTop:"20px",marginBottom:"30px"}}>

                <ToggleButtonGroup
                    value={this.state.timeFrame}
                    exclusive
                    onChange={this.handleTimeFrameChange}
                    aria-label="text alignment"
                    >
                    <ToggleButton value="week" aria-label="centered">
                        Week
                    </ToggleButton>
                    <ToggleButton value="month" aria-label="right aligned">
                        Month
                    </ToggleButton>
                    <ToggleButton value="year" aria-label="justified" >
                        Year
                    </ToggleButton>
                </ToggleButtonGroup>

                <div className="staff_dashboard-panel_wrapper">
                    <StaffDashboardSimpleStat label="Total Visitors" value={this.getOverview('totalVisitors')} onClick={() => this.handleDataTypeChange('totalVisitors')} />
                </div>

                <div className="staff_dashboard-panel_wrapper">
                    <StaffDashboardGraph 
                        data={this.getGraphData()} 
                        labels={this.getGraphLabels()} 
                        labelValue="Visits"
                        title={dataTypeLabels[this.state.dataType]} 
                        subtitle={"from the past " + this.state.timeFrame}/>
                </div>

                <div className="staff_dashboard-panel_wrapper">
                    
                    <StaffDashboardListWrapper 
                        title="Users" 
                        link="/users" 
                        items={this.state.data.user_stats.users}/>

                </div>
            </div>
        )
    }
}

export default StaffDashboardPage;