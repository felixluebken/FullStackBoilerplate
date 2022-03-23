import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import './staff.css';



import AmsterdamBackground from '../components/background/AmsterdamNightlifeBg';


function StaffLoginPage(props) {

    React.useEffect(() => {
        document.title = `Staff Log In`;
      });

    const [userLogin,setUserLogin] = React.useState({
        email:"",
        password:"",
        showPassword:false
    })
    const handleUserLoginChange = (prop) => (event) => {
        setUserLogin({ ...userLogin, [prop]: event.target.value });
    };


    const handleClickShowPassword = () => {
        setUserLogin({
          ...userLogin,
          showPassword: !userLogin.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return(

        <body className="login_page" style={{overflowX:"hidden",overflowY:"hidden"}}>        

            <AmsterdamBackground />
            
            <Box sx={{ display: 'flex',height:"100vh", justifyContent:"center", alignItems:"center", background:"white" }}>
                <div className="login_panel">
                <div className="login_panel-logo">
                    <div className="login_panel-logo_img"/>
                    <Typography sx={{fontWeight:700}} variant="h4" style={{ color: '#393942', userSelect:"none" }}>WeParty</Typography>
                    </div>

                    <Typography sx={{fontWeight:700}} variant="body1" style={{ color: '#393942', userSelect:"none",marginBottom:"20px" }}>{props.data.titleText}</Typography>

                    <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            value={userLogin.email}
                            onChange={handleUserLoginChange('email')}
                            label="Email"
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={userLogin.showPassword ? 'text' : 'password'}
                            value={userLogin.password}
                            onChange={handleUserLoginChange('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {userLogin.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <Button 
                        variant="contained" 
                        style={{backgroundColor:"#3552FB", width:'80%',marginTop:"30px"}}
                        onClick={() => props.authenticate(userLogin.email,userLogin.password)}
                        
                    >Authenticate</Button>

                </div>

            </Box>
            
        
        </body>
    )

}


export default StaffLoginPage;