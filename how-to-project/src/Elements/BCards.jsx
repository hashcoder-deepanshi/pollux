import React ,{useState,useEffect} from "react";
import Card from "@mui/material/Card";
import { auth, db } from "../Firebase/firebase";
import useAuthState from "../Firebase/hooks";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { collection, doc,query,onSnapshot, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import DeleteArticle from "./DeleteArticle";
import { CardActions } from "@mui/material";


export default function BCards({user}) {
  const [articles,setArticles]=useState([]);
  

  useEffect(()=>{
    const reportRef= collection(db,"users",user.email,"My submission");
    const q = query(reportRef);

    onSnapshot(q,(snapshot)=>{
        const articles = snapshot.docs.map((doc)=>({
            id:doc.id,
            ...doc.data(),
        }));
        setArticles(articles);
        console.log(articles);
    })
  },[]);
  
    
  return (
    <div>
    {
      articles.length === 0 ?(
          <p style={{margin: 20, fontSize: 22}}>No articles found</p>
      ):(
  
      articles.map(({id,Title,Topic,imgURL,author})=><div class="ApproveCard" key={id}>
  
      <Card className="cards"
        sx = {{ background: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${imgURL}) no-repeat center`}}
      >
        {/* <CardMedia component="img" height="140" image={`${imgURL}`} alt="media" /> */}
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          <Link to={`/article/${id}`} class="blogCard-title">{Title}</Link>
          </Typography>
          <Typography variant="body2" color="white">
            Author: {author.name}
          </Typography>
          <Typography variant="body2" color="white">
            Field: {Topic}
          </Typography>
          
        </CardContent>
        <CardActions>
        <Button
              size="small"
              sx={{ backgroundColor: "none", color: "#c69af6" }}
            >
              <i class="fas fa-2x fa-file-circle-plus"></i>
            </Button>
        <DeleteArticle id={id}/>
        </CardActions>
      </Card>
      
    </div>)
      )
  }
  </div>

  );
}
