import React from "react";
import mainImg from "../Images/image 2.png";
import Line from "../Images/Line.png";
import Navbar  from "../Elements/Navbar";
import { FlipCard } from "react-flipme";
import Logo from "../Images/Logo.png";
import Down_arrow from "../Images/down-arrow.png";
import LoginIcon from "../Elements/login";

import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import MemberCard from "../memberCard";
import members from "../members";
import Marquee from "react-fast-marquee";
import CardFlip from "../Elements/FlipCard";

function Home() {
  return (
    <div>
      {/* Navbar */}
      <div class="bar">
            <nav>
                <img class="Logo" src={Logo} alt="Logo" />
                
                <ul>
                    <li class="active-page"><a href="/">Home</a></li>
                    <li><a href="/feed">My Feed</a></li>
                    <li><a href="/my-activity">Activities</a></li>
                    <li><a href="/searchpage">Search</a></li>
                    
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
                

                <button type="button" class="b2">Get Chrome Extension</button>
                <button><a href="/loginpage"><i class="fa-regular fa-3x fa-circle-user"></i></a></button>
            </nav>
            <hr/>
        </div>

      {/*****  SECTION 1 ******/}
      <div class="home-section-1">
        <div class="row">
          <div>
            <h1>TAG LINE HERE</h1>
            
          </div>
          <div class="col-lg-7">
            <img class="mainImg" src={mainImg} alt="mainImg" />
            
          </div>

           <div className="marquee-text">
            <Marquee>
            <span> CELESTIAL BUISCUIT IGDTUW  • &nbsp;</span>
            <span> CELESTIAL BUISCUIT IGDTUW  • &nbsp;</span>
            <span> CELESTIAL BUISCUIT IGDTUW  • &nbsp;</span>
            <span> CELESTIAL BUISCUIT IGDTUW  • &nbsp;</span>
            <span> CELESTIAL BUISCUIT IGDTUW  • &nbsp;</span>
            <span> CELESTIAL BUISCUIT IGDTUW  • &nbsp;</span>
            <span> CELESTIAL BUISCUIT IGDTUW  • &nbsp;</span>
            </Marquee>
          </div>

        </div>
      </div>

      <section id="features">
        <div class="row">
          <h1>FEATURES</h1>
          <img class="Line" src={Line} alt="Line" />
        </div>

        <div class="frames">

        <div className='card-main'>
          <FlipCard>
            <FlipCard.Front className="cardFront card">
              <h3>FEATURE NAME</h3>
            </FlipCard.Front>
            <FlipCard.Back className="cardBack card">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dicta, quasi soluta deleniti, quam sunt dolorum, impedit magnam tempora suscipit quod error fugit temporibus omnis hic ullam modi corrupti placeat?</p>
            </FlipCard.Back>
          </FlipCard>
        </div>

        <div className='card-main'>
          <FlipCard>
            <FlipCard.Front className="cardFront card">
            <h3>FEATURE NAME</h3>
            </FlipCard.Front>
            <FlipCard.Back className="cardBack card">
              <p>desc</p>
            </FlipCard.Back>
          </FlipCard>
        </div>

        <div className='card-main'>
          <FlipCard>
            <FlipCard.Front className="cardFront card">
            <h3>FEATURE NAME</h3>
            </FlipCard.Front>
            <FlipCard.Back className="cardBack card">
              <p>desc</p>
            </FlipCard.Back>
          </FlipCard>
        </div>

        </div>
        
      </section>

      <section id="team">
        <div class="row">
          <h1>TEAM</h1>
          <img class="Line" src={Line} alt="Line" style={{width: "150px",}}/>
        </div>

        <div class="team-frames">
        <div className='team-card-main'>
          <FlipCard>
            <FlipCard.Front className="cardFront team-card">
              <h3>NAME 1</h3>
              <h4>POSITION</h4>
            </FlipCard.Front>
            <FlipCard.Back className="cardBack team-card">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dicta, quasi soluta deleniti, quam sunt dolorum, impedit magnam tempora suscipit quod error fugit temporibus omnis hic ullam modi corrupti placeat?</p>
            </FlipCard.Back>
          </FlipCard>
        </div>

        <div className='team-card-main'>
          <FlipCard>
            <FlipCard.Front className="cardFront team-card">
            <h3>NAME 2</h3>
            <h4>POSITION</h4>
            </FlipCard.Front>
            <FlipCard.Back className="cardBack team-card">
              <p>desc</p>
            </FlipCard.Back>
          </FlipCard>
        </div>

        <div className='team-card-main'>
          <FlipCard>
            <FlipCard.Front className="cardFront team-card">
            <h3>NAME 3</h3>
            <h4>POSITION</h4>
            </FlipCard.Front>
            <FlipCard.Back className="cardBack team-card">
              <p>desc</p>
            </FlipCard.Back>
          </FlipCard>
        </div>
        </div>
      </section>


      {/* <div class="teamSection">
        <h1 class="team">THE TEAM</h1>

        {members.map((m) => (
          <MemberCard key={m.id} img={m.imgURL} />
        ))}
      </div> */}
    </div>
  );
}

export default Home;
