import React,{useRef} from "react";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import {Form , Card} from 'react-bootstrap';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import LoginPlanet from "../Images/LoginPlanet.png"
import { UserAuth } from "../Firebase/AuthContext";
import useAuthState from "../Firebase/hooks";
import { auth } from "../Firebase/firebase";
import Login from '../Images/Login.png'
import {GoogleButton } from 'react-google-button'
import './contribute.css';
import Logo from "../Images/Logo.png";




function LoginPage() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const { createUser } = UserAuth();
  const {User,logOut} = UserAuth()
  const {user,initializing} = useAuthState(auth);
  const navigate = useNavigate()

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  }

  const {googleSignIn} = UserAuth();
  const handleGoogleSignIn = async () =>{
        try{
         await googleSignIn()
         navigate("/feed")
        }catch(error){
            console.log(error);
        }
      }
      if(initializing){
        return("loading...");
      }

  return (
    <div>
    <div class="bar">
      <div class="login-nav">
        <img class="Logo" src={Logo} alt="Logo" />
      </div>
      <hr/>
    </div>


    <div className="ver-line">
      <img className="loginPlanet"  src={LoginPlanet} alt="mainImg" />
      <div className="vert-line">
        
        <div className="form-cont">
        <Typography variant="h4" color={"white"} align="center">Welcome !</Typography>
        <img class="loginImg" src={Login} alt="" />

        <div className="Google-Button-cont">  
              {/* <Typography variant="h6" sx={{marginTop:3,color:"white"}}>Login as User ?</Typography>  */}
              <GoogleButton class="google-button" onClick={handleGoogleSignIn}/>
        </div>

        <Typography variant="h6" sx={{marginTop:7,color:"white", textAlign:"center"}}>Login as Admin ?</Typography>  
        <TextField class="credentials" id="Email" type="email" fullWidth placeholder="Enter Email"></TextField>
        <TextField class="credentials" id="Password" type="password" fullWidth placeholder="Enter Password"></TextField>
          <Button  variant="contained"
          align="center"
          color="secondary"
          sx={{ marginTop: "20px" ,width:"323px", backgroundColor:"#8152BD", marginLeft:"37px", height:"42px"}}
          type="submit"> Sign In</Button>

      
        </div>
      </div>

      
    </div> 

    </div> 
  );
}

export default LoginPage;
