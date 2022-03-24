import React, { Component } from 'react';
import axios from 'axios';
import { Rings } from 'react-loader-spinner';

import StaffUserWrapper from '../../components/panels/StaffUserWrapper';
import Snackbar from '@mui/material/Snackbar';


class StaffUserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfiles:[],
            users:[],
            cities:[],

            snackBarOpen:false,
            snackBarText:"null",
            isLoading:true,
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        axios
            .get(this.props.proxy+"staff/user",
            {
                headers: {
                    'Authorization': localStorage.getItem('access_token')
                            ? 'Bearer ' + localStorage.getItem('access_token')
                            : null,
                    'Content-Type': 'application/json',
                    'accept':'application/json'
                }
            })
            .then((res) => this.setState({"users":res.data}))
            .catch((err) => {this.handleOpenSnackbar("something went wrong");console.log(err)})

        axios
            .get(this.props.proxy+"staff/userprofile",
            {
                headers: {
                    'Authorization': localStorage.getItem('access_token')
                            ? 'Bearer ' + localStorage.getItem('access_token')
                            : null,
                    'Content-Type': 'application/json',
                    'accept':'application/json'
                }
            })
            .then((res) => this.setState({"userProfiles":res.data,isLoading:false}))
            .catch((err) => {this.handleOpenSnackbar("something went wrong");console.log(err)})
    }


    toggleActive = (id) => {
        axios
            .post(this.props.proxy+"staff/user/", {
                method:"toggle_active",
                email:id
            },
            {
                headers: {
                    'Authorization': localStorage.getItem('access_token')
                            ? 'Bearer ' + localStorage.getItem('access_token')
                            : null,
                    'Content-Type': 'application/json',
                    'accept':'application/json'
                }
            })
            .then((res) => {this.handleOpenSnackbar(res.data.message);this.refreshData()})
            .catch((err) => {this.handleOpenSnackbar("something went wrong");console.log(err)})
    }
    toggleStaff = (id) => {
        axios
            .post(this.props.proxy+"staff/user/", {
                method:"toggle_staff",
                email:id
            },
            {
                headers: {
                    'Authorization': localStorage.getItem('access_token')
                            ? 'Bearer ' + localStorage.getItem('access_token')
                            : null,
                    'Content-Type': 'application/json',
                    'accept':'application/json'
                }
            })
            .then((res) => {this.handleOpenSnackbar(res.data.message);this.refreshData()})
            .catch((err) => {this.handleOpenSnackbar("something went wrong");console.log(err)})
    }
    deleteUser = (id) => {
        axios
            .post(this.props.proxy+"staff/user/", {
                method:"delete",
                email:id
            },
            {
                headers: {
                    'Authorization': localStorage.getItem('access_token')
                            ? 'Bearer ' + localStorage.getItem('access_token')
                            : null,
                    'Content-Type': 'application/json',
                    'accept':'application/json'
                }
            })
            .then((res) => {this.handleOpenSnackbar(res.data.message);this.refreshData()})
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
                    <Rings color="#FF5622" height="200" width="200" />
                </div>
            )
        }
        return(
            <div style={{marginTop:"20px",marginBottom:"30px",padding:"50px",}}>
                <StaffUserWrapper 
                    users={this.state.users} 
                    profiles={this.state.userProfiles} 
                    cities={this.state.cities}

                    toggleActive={(id) => this.toggleActive(id)}
                    toggleStaff={(id) => this.toggleStaff(id)}
                    deleteUser={(id) => this.deleteUser(id)}
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

export default StaffUserPage;