import { useContext , createContext , useEffect,useState} from "react";
import { GoogleAuthProvider , signInWithPopup, onAuthStateChanged,signOut , createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from '../Firebase/firebase';
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider =({children}) =>{
   const[user,setUser]=useState({});
    const googleSignIn = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider);
        
    };
    const createUser=(email,password)=>{
      return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })}
    
    const logOut= () =>{
        signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            console.log('User',currentUser)  ;
             setDoc(doc(db,"users",currentUser.email),{
            Bookmark:[],
            Liked:[]
            
        })      
        });
        return()=>{
          unsubscribe();
        };
    },[]);
    return  (
        <AuthContext.Provider value={{googleSignIn,logOut,user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth =() =>{
    return useContext(AuthContext);
}
