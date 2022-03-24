import StaffLoginPage from './StaffLogin';
import StaffPanel from './StaffPanel';

import React,  { Component } from 'react';
import { Rings } from 'react-loader-spinner';


import axios from "axios";


const proxy = "http://localhost:8000/";




const StaffPage = (props) => {
    if(props.isLoading) {
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
    else if(props.isAuthenticated && props.userData) {
        return(
            <StaffPanel 
                userData={props.userData}
                proxy={proxy}

                logout={() => props.logoutUser()}
            />
        )
    }
    else {
        return(
            <StaffLoginPage 
                data={props.loginPageData} 
                proxy={proxy}

                authenticate={(email,password) => props.authenticateUser(email,password)} 
            />
        )
    }
}

class StaffMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            isLoading: true,
            loginPageData: {
                titleText: "Staff Login"
            },

            token: null,
            userData: null,
            
        };
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        axios
            .get(proxy+"staff/auth/", 
                {
                    headers: {
                        'Authorization': localStorage.getItem('access_token')
                            ? 'Bearer ' + localStorage.getItem('access_token')
                            : null,
                        'Content-Type': 'application/json',
                        'accept':'application/json'
                    }
                }
            )
            .then((res) => {
                this.setState({ 
                    isAuthenticated: true, 
                    isLoading: false,
                    userData:res.data.user,
                })
                
            })
            .catch(() => {
                this.setState({ 
                    isAuthenticated: false, 
                    isLoading: false,
                    userData:null,
                })
            })
    }

    authenticateUser = (email,password) => {
        axios
            .post(proxy+"oauth2/token/", {
                "client_id":"3s77VBZG0WbK4HubaP0V7pQfGDM7aUO0ylMoR7e9",
                "grant_type":"password",
                "username":email,
                "password":password
            })
            .then((res) => {
                console.log(res)
                this.setState({
                    loginPageData: {
                        titleText:"Authenticated"
                    },
                    isAuthenticated: true,
                    isLoading:true,
                })
                localStorage.setItem('access_token',res.data.access_token)
                localStorage.setItem('refresh_token',res.data.refresh_token)
                this.refreshData()
            })
            .catch((res) => {
                this.setState({
                    loginPageData: {
                        titleText:"Unauthorized!"
                    },
                    isAuthenticated: false,
                    isLoading:false,
                    userData:null,

                })
            })
    }
    logoutUser = () => {
        axios
            .get(proxy+"auth/staff/signout",
                {
                    headers: {
                        'Authorization': localStorage.getItem('access_token')
                            ? 'Bearer ' + localStorage.getItem('access_token')
                            : null,
                    }
                }
            )
            .then(() => {
                this.setState({ 
                    loginPageData: {
                        titleText: "Staff Login"
                    },
                    isAuthenticated: false, 
                    isLoading: false,
                    userData:null,
                })
                localStorage.setItem('access_token',null)
                localStorage.setItem('access_token',null)
            })
            .catch((err) => console.log(err))
    }

    render() {
        return(
            <StaffPage 
                isLoading={this.state.isLoading}
                isAuthenticated={this.state.isAuthenticated}
                loginPageData={this.state.loginPageData}
                userData={this.state.userData}

                authenticateUser={(email,password) => this.authenticateUser(email,password)}
                logoutUser={() => this.logoutUser()}
            />
        )
    }
}


export default StaffMain;