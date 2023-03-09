import { arrayUnion,arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { auth, db } from '../Firebase/firebase';
import {v4 as uuidv4} from 'uuid'
import { TextField } from '@mui/material';


export default function Comment({currentlyLoggedInUser,id}){
    const [comment,setComment]=useState("");
    const [comments,setComments]=useState([]);
    
    const commentRef = doc(db,"Admin",id)

    useEffect(()=>{
        const docRef = doc(db,"Admin",id)
        onSnapshot(docRef,(snapshot)=>{
           setComments(snapshot.data().comments);
        })
    },[]);

const handleChangeComment=(e)=>{
    if(e.key ==="Enter"){
        updateDoc(commentRef,{
            comments:arrayUnion({
                user:currentlyLoggedInUser.uid,
                userName:currentlyLoggedInUser.displayName,
                comment:comment,
                commentId: uuidv4()
            }),
        }).then(()=>{
                setComment("");
            });
    }
}

const handleDeleteComment=(comment)=>{
    console.log(comment);

    updateDoc(commentRef, {
        comments: arrayRemove(comment)
    })
    .then((e) => {
        console.log(e);
    })
    .catch((error) => {
        console.log("error",error);
    })
}
    return(
        <div>
            <div className='container' >
                {
                comments.map(({commentId,user,comment,userName})=>(
                  <div key={commentId}>
                        <div>
                            <span className={`badge ${
                                user === currentlyLoggedInUser.uid?
                                "bg-success"
                                :"bg-primary"}`}>
                                {userName}
                                </span>
                                {comment}
                        </div>
                        <div >
                            {user ===currentlyLoggedInUser.uid && (
                                <i className='fa fa-trash' 
                                onClick={()=>handleDeleteComment({commentId,user,comment,userName})} style={{cursor:"pointer"}}></i>
                            )}
                        </div>
                    
                  </div>
            ))}
                    { currentlyLoggedInUser 
                        ?<TextField
                           type="text" 
                           className='form-control mt-4 mb-5' 
                           value={comment}
                           multiline
                           rows={4} 
                           onChange={(e)=>{setComment(e.target.value);}}
                           placeholder="Add a comment"
                           onKeyUp={(e)=>{handleChangeComment(e);}} 
                           sx={{backgroundColor:"rgb(255,255,255,0.98)"}}/>
                        :null
                    }
            </div>
            
        </div>
    )
}