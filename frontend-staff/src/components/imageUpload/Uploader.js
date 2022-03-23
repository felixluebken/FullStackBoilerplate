import React from 'react';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Typography from '@mui/material/Typography';

const ImageUpload = (props) => {
    let uploadStatus;
    let uploadIcon;
    const [image,setImage] = React.useState(null)
    const [error,setError] = React.useState(null)

    const handleImageSelect = (event) => {
        if(event.target.files.length !== 1) {
            setError("Only select one image");
            setImage(null);
            return;
        }
        if((event.target.files[0].size/1024) > 2000) {
            setError("Must be smaller than 2MB");
            setImage(null);
            return;
        }

        setImage(event.target.files[0])
        props.setImage(event.target.files[0])
    }


    if(image) {
        uploadIcon = <DownloadDoneIcon style={{width:"100%",marginTop:"38px"}} fontSize="large"/>
        uploadStatus = <Typography variant="subtitle2" align="center" style={{color:"#27282B"}}>
            Image Selected
        </Typography>
    }
    else if(error) {
        uploadIcon = <PriorityHighIcon style={{width:"100%",marginTop:"38px"}} fontSize="large"/>
        uploadStatus = <Typography variant="subtitle2" align="center" style={{color:"#27282B"}}>
            {error}
        </Typography>
    }
    else {
           
        uploadIcon = <FileUploadIcon style={{width:"100%",marginTop:"38px"}} fontSize="large"/>
        uploadStatus = <Typography variant="subtitle2" align="center" style={{color:"#27282B"}}>
            Upload Image
        </Typography>
    }

    return(
        <div className="add_img-event_panel" style={{padding:"0"}}>

            <div style={{width:"150px",height:"150px",position:"absolute",cursor:"pointer"}}>
            {uploadIcon}
            {uploadStatus}
            </div>
            
            <input style={{width:"150px",height:"150px",position:"absolute",opacity:"0",cursor:"pointer"}} type="file" accept="image/*" onChange={handleImageSelect} />
        </div>
        
    )

}


export default ImageUpload