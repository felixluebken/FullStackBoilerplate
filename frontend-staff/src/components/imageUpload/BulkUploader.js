import React from 'react';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Typography from '@mui/material/Typography';


const BulkImageUploader = (props) => {
    let uploadStatus;
    let uploadIcon;
    const [image,setImage] = React.useState(null)
    const [error,setError] = React.useState(null)

    const handleImageSelect = (event) => {

        if(event.target.files.length > 8) {
            setError("Select under 8 or less images");
            setImage(null);
            return;
        }
        for(var i = 0; i < event.target.files.length; i++)

            if((event.target.files[i].size/1024) > 2000) {
                setError("Must be smaller than 2MB");
                setImage(null);
                return;
            }

        setImage(event.target.files)
        props.setImage(event.target.files)
    }


    if(image) {
        uploadIcon = <DownloadDoneIcon style={{width:"100%",marginTop:"38px"}} fontSize="large"/>
        uploadStatus = <Typography variant="subtitle2" align="center" style={{color:"#27282B"}}>
            Images Selected
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
            Upload Images
        </Typography>
    }

    return(
        <div className="add_img-event_panel" style={{padding:"0"}}>

            <div style={{width:"150px",height:"150px",position:"absolute",cursor:"pointer"}}>
            {uploadIcon}
            {uploadStatus}
            </div>
            
            <input style={{width:"150px",height:"150px",position:"absolute",opacity:"0",cursor:"pointer"}} type="file" accept="image/*" multiple onChange={handleImageSelect} />
        </div>
        
    )
}


export default BulkImageUploader;