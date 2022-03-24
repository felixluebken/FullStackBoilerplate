import React, { Component } from 'react';
import axios from 'axios';
import { Rings } from 'react-loader-spinner';

import StaffVisitsWrapper from '../../components/panels/StaffVisitsWrapper.js';
import Snackbar from '@mui/material/Snackbar';


class StaffVisitsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visits:[],

            snackBarOpen:false,
            snackBarText:"null",
            isLoading:true

        }
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        axios
            .get(this.props.proxy+"staff/uservisit",
            {
                headers: {
                    'Authorization': localStorage.getItem('access_token')
                            ? 'Bearer ' + localStorage.getItem('access_token')
                            : null,
                    'Content-Type': 'application/json',
                    'accept':'application/json'
                }
            })
            .then((res) => this.setState({"visits":res.data,isLoading:false}))
            .catch((err) => {this.handleOpenSnackbar("something went wrong");console.log(err)})
    }



    handleOpenSnackbar = (text) => {
        this.setState({
            snackBarOpen:true,
            snackBarText:text,
        })
    }

    handleCloseSnackbar = () => {
        this.setState({
            snackBarOpen:false,
            snackBarText:"null",
        })
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
            <div style={{marginTop:"20px",marginBottom:"30px",padding:"50px",}}>
                <StaffVisitsWrapper 
                    visits={this.state.visits}
                />
                <Snackbar
                    open={this.state.snackBarOpen}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnackbar}
                    message={this.state.snackBarText}
                />
            </div>  
        )
    }
}

export default StaffVisitsPage;