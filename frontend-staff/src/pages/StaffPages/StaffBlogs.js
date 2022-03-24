import React, { Component } from 'react';
import axios from 'axios';
import { Rings } from 'react-loader-spinner';


import StaffBlogWrapper from '../../components/panels/StaffBlogWrapper';
import Snackbar from '@mui/material/Snackbar';



  

class StaffBlogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs:[],

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
            .get(this.props.proxy+"staff/blog",
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
                this.setState({"blogs":res.data,isLoading:false})
                console.log(res.data)
            })
            .then((res) => console.log(res))
            .catch((err) => {this.handleOpenSnackbar("something went wrong");console.log(err)})
    }

    deleteSelection = (selection) => {
        if(selection.length === 0) {
            this.handleOpenSnackbar("Please make a selection first");
            return;
        }

        var bodyFormData = new FormData()
        bodyFormData.append('method','delete')
        bodyFormData.append('ids',selection)

        axios
            .post(this.props.proxy+"staff/blog/",
            bodyFormData,
            {
                headers: {
                    'Authorization': localStorage.getItem('access_token')
                        ? 'Bearer ' + localStorage.getItem('access_token')
                        : null,
                    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                    'accept':'application/json'
                }
            })
            .then((res) => {
                this.handleOpenSnackbar(res.data.message)
                this.refreshData()
            })
            .catch((err) => {this.handleOpenSnackbar("something went wrong");console.log(err)})
    }
    add = (title,author,body,isPinned,image) => {

        this.handleOpenSnackbar("Uploading assets...");


        var bodyFormData = new FormData()
        bodyFormData.append('method','add')
        bodyFormData.append('title',title)
        bodyFormData.append('author',author)
        bodyFormData.append('body',body)
        bodyFormData.append('is_pinned',isPinned)
        
        if(image !== null) {
            bodyFormData.append('image',image)
        }
        axios
            .post(this.props.proxy+"staff/blog/",
            bodyFormData,
            {
                headers: {
                    'Authorization': localStorage.getItem('access_token')
                        ? 'Bearer ' + localStorage.getItem('access_token')
                        : null,
                    'Content-Type': 'multipart/form-data',
                    'accept':'application/json'
                }
            })
            .then((res) => {
                this.handleOpenSnackbar(res.data.message)
                this.refreshData()
            })
            .catch((err) => {this.handleOpenSnackbar("something went wrong");console.log(err)})
    }
    edit = (id,title,author,body,isPinned,image) => {

        this.handleOpenSnackbar("Uploading assets...");


        var bodyFormData = new FormData()
        bodyFormData.append('method','edit')
        bodyFormData.append('title',title)
        bodyFormData.append('author',author)
        bodyFormData.append('body',body)
        bodyFormData.append('is_pinned',isPinned)
        bodyFormData.append('id',id)
        
        
        if(image !== null) bodyFormData.append('image',image)
        else bodyFormData.append('image','null')

        axios
            .post(this.props.proxy+"staff/blog/",
            bodyFormData,
            {
                headers: {
                    'Authorization': localStorage.getItem('access_token')
                        ? 'Bearer ' + localStorage.getItem('access_token')
                        : null,
                    'Content-Type': 'multipart/form-data',
                    'accept':'application/json'
                }
            })
            .then((res) => {
                this.handleOpenSnackbar(res.data.message)
                this.refreshData()
            })
            .catch((err) => {this.handleOpenSnackbar("something went wrong");console.log(err)})
    }
    toggleActive = (id) => {
        console.log(id)
        axios
            .post(this.props.proxy+"staff/blog/", {
                method:"toggle_active",
                id:id,
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
                    <Rings color="#274472" height="200" width="200" />
                </div>
            )
        }
        return(
            <div style={{marginTop:"20px",marginBottom:"30px",padding:"50px",display:'flex',justifyContent:"space-between",alignContent:"center"}}>
                <StaffBlogWrapper 
                    items={this.state.blogs}

                    deleteSelection={(selection) => this.deleteSelection(selection)}
                    add={(title,author,body,isPinned,image) => this.add(title,author,body,isPinned,image)}
                    edit={(id,title,author,body,isPinned,image) => this.edit(id,title,author,body,isPinned,image)}
                    toggleActive={(id) => this.toggleActive(id)}
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

export default StaffBlogPage;