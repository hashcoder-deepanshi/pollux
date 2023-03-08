import React, { useState } from "react";
import Logo from "../Images/Logo.png";
import Down_arrow from "../Images/down-arrow.png";
import PopUp from "./PopUp.jsx";
import LoginIcon from "./login";
import Button from "@mui/material/Button";
import {db,auth} from '../Firebase/firebase'
import { UserAuth } from "../Firebase/AuthContext";
import { useNavigate } from 'react-router-dom';
import { collection ,addDoc} from "firebase/firestore";
import TransitionModal from './Modal';

import { NavLink } from "react-router-dom";


function Navbar () {
  const navigate = useNavigate()

    const {user, logOut} = UserAuth(auth);
    const [feedback, setFeedback] = useState(false);


    /********for adding Feedback ***********/
  const [Response,setResponse]=useState("");
  const feedbackRef=collection(db,"Feedback");
  
  const handleFeedback=async (e)=>{   
    // console.log(user); 
    e.preventDefault();
    if(user===null)
    {alert("Login to provide feedback");
    return false;
    }
    else if(Response===""){
      alert("Fill all the fields");
      return false;
    }else{
    await addDoc(feedbackRef,{
        Response,
        author:{name:auth.currentUser.displayName,id:auth.currentUser.uid},
        
    }).then(()=>{alert("Feedback submitted")}).catch(err=>{alert(err.message)});

    setResponse("");
}
};
  /*************************/

    
    const handleSignOut = async()=>{
        try{
          await logOut()
        }catch(error){
          console.log(error)
        }
    }

    return ( 
        <div class="bar">
            <nav>
                <img class="Logo" src={Logo} alt="Logo" onClick={()=>{navigate('/')}}/>
                <input type="checkbox" id="check"/>
                    <label for="check" class="checkbtn">
                        <i class="fas fa-bars"></i>
                    </label>
                
                <ul class="navbar-options">
                    <li>
                        <NavLink  to="/SearchPage" activeclassName="active-page">Explore</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Contribute" activeclassName="active-page">Publish</NavLink>
                    </li>
                    
                    {
                        // (user.providerData[0].providerId === 'google.com')
                        // ? <li><a href="/my-activity">Dashboard</a></li>
                        // : <li><a href="/admin">Dashboard</a></li>
                    }
                    
                    
                    
                </ul>
                
                <div class="dropdown">
                <a class="login-icon"><i class="fa-regular fa-3x fa-circle-user"></i></a>
                    <ul class="dropdown-content">
                        <li onClick={()=> {navigate('/my-activity')}}>Dashboard </li>
                        <li onClick={() => setFeedback(true)}>
                        <TransitionModal 
          title="Feedback" 
          button={<span class="feedback-btn">Feedback </span>}
          content="Your Feedback will help us to improve our website and your own experience. Kindly spare a minute to provide your valuable feeback. Thankyou.">             
            <input type="text" onChange={(e)=>{setResponse(e.target.value)}}></input>
            <Button  variant="contained"
          align="center"
          color="secondary"
          sx={{ marginTop: "20px" ,width:"23em", backgroundColor:"#8152BD", marginLeft:"8em", height:"42px", fontFamily:"Montserrat", "&:hover": {backgroundColor: "#8152BD" } }}
          onClick={handleFeedback}
          > Submit</Button>
          </TransitionModal>
            </li>

                        {
                    user? <li onClick={handleSignOut}>Logout </li> 
                        : <li onClick={()=> {navigate('/loginpage')}}>Login </li>
                        }

                        
                    </ul>
                </div>


            </nav>
            <hr/>
        </div>
    );
}

export default Navbar ;