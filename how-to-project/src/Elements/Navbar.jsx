import Logo from "../Images/Logo.png";
import Down_arrow from "../Images/down-arrow.png";
import LoginIcon from "./login";
import { UserAuth } from "../Firebase/AuthContext";

function Navbar () {

    const {user, logOut} = UserAuth();

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
                <img class="Logo" src={Logo} alt="Logo" />
                
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/feed">My Feed</a></li>
                    <li><a href="/searchpage">Search</a></li>
                    <li><a href="/my-activity">Dashboard</a></li>
                    {/* <li><a href="feed">Feed</a></li>
                    <li><a href="My-Activity">My Activity</a></li>
                    <li><a href="SearchPage">Search</a></li> */}
                    
                    <li>
                    <div class="dropdown">
                    <button class="dropbtn"><img src={Down_arrow}></img></button>
                    <ul class="dropdown-content">
                        {/* <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#">Publish</button> */}
                        <li>Publish <span></span><span></span><span></span><span></span></li>
                        <li>Invite <span></span><span></span><span></span><span></span></li>
                        <li>Feedback <span></span><span></span><span></span><span></span></li>
                    </ul>
                    </div>
                    </li>
                    
                </ul>
                
                {
                    user? <button class="b2" onClick={handleSignOut}>Logout</button>
                        : <a class="login-icon" href="/loginpage"><i class="fa-regular fa-3x fa-circle-user"></i></a>
                }
                {/* <LoginIcon/> */}

            </nav>
            <hr/>
        </div>
    );
}

export default Navbar ;