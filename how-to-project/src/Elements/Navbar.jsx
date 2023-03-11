import React, { useState } from "react";
import Logo from "../Images/Logo.png";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {db,auth} from '../Firebase/firebase'
import { UserAuth } from "../Firebase/AuthContext";
import { useNavigate } from 'react-router-dom';
import { collection ,addDoc} from "firebase/firestore";
import TransitionModal from './Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";
import { CardContent } from "@mui/material";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import { NavLink } from "react-router-dom";


function Navbar () {
  const navigate = useNavigate()

    const {user, logOut} = UserAuth(auth);
    const [feedback, setFeedback] = useState(false);

    /***adding tags *****/
    const addTags = event =>{
      if(event.key === "Enter" && event.target.value !== ""){
        setTags([...Tags,event.target.value]);
        event.target.value = "";
        console.log(Tags);
      }
    }
    const removeTags = indexToremove => {
      setTags(Tags.filter((_,index)=>index !== indexToremove))
    }

    /****for adding into database ****/
    const [Title,setTitle]=useState("")
    const [link,setLink]=useState("")
    const [imgURL,setImgURL]=useState("");
    const [category,setCat]=useState("");
    const [Topic,setTopic]=useState("")
    const [Tags,setTags]=useState([])

     const bloglist=collection(db,'Admin');

     const handleSubmit=async (e)=>{ 
      e.preventDefault();
      if(Title===""||link===""){
        alert("Fill all the fields");
        return false;
      }else{
        
          await addDoc(bloglist,{
          Title,
          Topic,
          link,
          imgURL,
          author:{name:auth.currentUser.displayName,id:auth.currentUser.uid},
          category,
          comments:[],
          status:false,
          Tags:[],
          tags: [Title.toLocaleLowerCase(), Topic.toLocaleLowerCase()],

      }).then(()=>{alert("success!!")}).catch(err=>{alert(err.message)});


  
  /**adding in users collection********/
  const reportRef=collection(db,"users",user.email,"My submission");

  await addDoc(reportRef,{
    Title,
    Topic,
    link,
    imgURL,
    author:{name:auth.currentUser.displayName,id:auth.currentUser.uid},
    category,
    comments:[],
    status:false,
    Tags,
    tags: [Title.toLocaleLowerCase(), Topic.toLocaleLowerCase()],

}).catch(err=>{alert(err.message)});
  }
      navigate("/searchpage")
  };

    /**for image */
    const[image,setImage]=useState([])
    const[photo,setPhoto]=useState("");

    function handleImg(event){
        setPhoto(event.target.value);
        // setMultiformValue({...multiformValue,imgURL:(event.target.value)})
    }
    const getImage=()=>{
        console.log(photo);
        const url = "https://api.unsplash.com/search/photos?page=1&per_page=21&query="
        +photo
        +"&client_id=v86lrJGasQUoSxAr-QPu0VGuOUUjIE07njw-R1bMyl0"
      axios.get(url)
      .then((response)=>{
        setImage(response.data.results)
        console.log(response.data.results)
      })
    }
    const handleImage=async(e)=>{
      //const bloglist= collection(db,"Image")

      //await addDoc(bloglist,{
      //  img
      //}).then(()=>{alert("success!!")}).catch(err=>{alert(err.message)});

      //setImg(e.target.currentSrc)

      // console.log(e);
      //console.log(e.target.currentSrc);
      setImgURL(e.target.currentSrc)
      console.log("clicked")
    }

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
                    <TransitionModal 
                      title="CONTRIBUTE" 
                      button={<>CONTRIBUTE</>}
                      content="Found an interesting article? Do you want to share with the community?">  
                      <TextField 
                        class="cred" 
                        id="Title" 
                        type="text" 
                        fullWidth 
                        placeholder="Enter Title" 
                        onChange={(e)=>{setTitle(e.target.value)}}
                      required/>
                      <TextField 
                        class="cred" 
                        id="link" 
                        type="text" 
                        fullWidth 
                        placeholder="Enter URL"
                        onChange={(e)=>{setLink(e.target.value)}} 
                      />  
                      <div className="cred">
                        <ul>
                          {Tags.map((Tag,index)=>(
                            <div key={index} className="tags" >
                              <span>{Tag}</span>
                              <i class="fa-solid fa-circle-xmark" onClick={()=> removeTags(index)}></i>
                            </div>
                          ))}
                        </ul>
                        <input 
                        id="tags" 
                        type="text" 
                        placeholder="Enter Tags"
                        onKeyUp={addTags}
                      /> 
                      </div>
                           
                      <FormControl  sx={{margin:2,color:"white"}}>
                        <FormLabel id="demo-row-radio-buttons-group-label" sx={{color:"white"}}>Choose Category</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          
                        >
                        <FormControlLabel control={<Radio />} label="Research Paper" value="ResearchPaper"  onChange={(e)=>{setCat("Research paper")}}/>
                        <FormControlLabel control={<Radio />} label="Blogs" value="Blogs"  onChange={(e)=>{setCat("Blogs")}}/>
                        <FormControlLabel control={<Radio />} label="Interviews" value="TechnicalStuff"  onChange={(e)=>{setCat("Technical Stuff")}}/>
                        </RadioGroup>
                      </FormControl>   
                    <TransitionModal
                      title="CHOOSE IMAGE"
                      content="Choose an image to display that best suits your blog. "
                      button={<Button  variant="contained" align="center" color="secondary" sx={{ 
                        marginTop: "20px" ,
                        width:"23em", 
                        backgroundColor:"#8152BD", 
                        marginLeft:"8em",  
                        height:"42px", 
                        fontFamily:"Montserrat", 
                        "&:hover": {backgroundColor: "#8152BD" } }}
                      > Next</Button>}>
                      <div> 
            <input 
            onChange={handleImg} 
            class="search-image"
            type="search"
            placeholder="Search for photos"
            id="searchInput"
            />
            <Button class="search-icon image" onClick={getImage}><i class="fa-solid fa-magnifying-glass"></i></Button>
        </div>
          <div className="img-container">
            <div className="row">
                {
                    image.map((prop)=>{
                        return(
                            <Card sx={{ maxWidth: 145 ,margin:1}}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="145"
                                src={prop.urls.small}
                                alt="image"
                                onClick={handleImage}
                              />
                            </CardActionArea>
                          </Card>
                        )
                    })
                }
            </div>
            </div>
            <Button  variant="contained" align="center" color="secondary" sx={{ 
                        marginTop: "20px" ,
                        width:"23em", 
                        backgroundColor:"#8152BD", 
                        marginLeft:"8em",  
                        height:"42px", 
                        fontFamily:"Montserrat", 
                        "&:hover": {backgroundColor: "#8152BD" } }}
                        onClick={handleSubmit}
                      > Submit</Button>      
</TransitionModal>
          </TransitionModal>
                        
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
          title="FEEDBACK" 
          button={<span class="feedback-btn">Feedback </span>}
          content="Your Feedback will help us to improve our website and your own experience. Kindly spare a minute to provide your valuable feeback. Thankyou.">             
                    <TextField 
                    class="cred" 
                    id="feedback" 
                    type="text" 
                    fullWidth 
                    placeholder="Enter Feedback" 
                    onChange={(e)=>{setResponse(e.target.value)}}
                    />                    

            <Button  variant="contained"
          align="center"
          color="secondary"
          sx={{ 
            marginTop: "20px" ,
            width:"23em", 
            backgroundColor:"#8152BD", 
            marginLeft:"8em", 
            height:"42px", 
            fontFamily:"Montserrat", 
            "&:hover": {backgroundColor: "#8152BD" } }}
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