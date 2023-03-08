import React ,{useState}from "react";
import BCards from "../Elements/BCards";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import useAuthState from "../Firebase/hooks";
import { auth } from "../Firebase/firebase";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Liked from "../Elements/Liked";
import Bookmarked from "../Elements/Bookmarked";
import Navbar from "../Elements/Navbar";
import Button from "@mui/material/Button";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MyActivity() {
  const {user}=useAuthState(auth);
  const[value,setValue] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleSearch = async () => {
  //   const articleRef=collection(db,"Admin")
 
  //     var q;
  //     if(searchInput.length > 0){
  //       q = q=query(articleRef,where('status',"==",true),where('category',"==","Blogs"), where("tags", "array-contains" , searchInput.toLowerCase()));
  //     }
  //     else {
  //      q = query(articleRef,where('status',"==",true),where('category',"==","Blogs"));
  //     }
 
  //     console.log(q);
  //     onSnapshot(q,(snapshot)=>{
  //       const blog = snapshot.docs.map((doc)=>({
  //         id:doc.id,
  //         ...doc.data(),
  //       }));
  //       setBlogs(blog);
  //       console.log(blog);
  //    });
  // };

  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     handleSearch();
  //   }
  // };

  return (
    <>
      <Navbar/>
      {/* SEARCH BAR */}
      <div>
        <input 
          class="search-bar"
          type="search"
          placeholder="Search"
          id="searchInput"
          onChange={(e)=>{setSearchInput(e.target.value);}}
          // onKeyDown = {handleKeyDown}
      />
      <Button class="search-icon" 
      // onClick={handleSearch}
      ><i class="fa-solid fa-magnifying-glass"></i></Button>

      </div>

      {user ?
      <div style={{marginLeft: '5%', marginRight: '5%'}}>
        
      {/* <Avatar
  alt="Remy Sharp"
  src={user.photoURL}
  sx={{ width: 126, height: 126 ,marginLeft:80}}
/> 
 <Typography variant="h4" align="center" sx={{color:"white", margin:2}}>{user.displayName}</Typography> */}
<Box
    sx={{
        width: '100%',
        marginLeft:1,
      }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="white"
            indicatorColor="secondary"
            sx={{marginLeft:33 , color:"white" , paddingLeft:9 , marginTop:20 }}>
          <Tab sx={{marginRight:3 , fontSize:22}} label="my submissions" {...a11yProps(0)} />
          <Tab sx={{marginRight:3 , fontSize:22}} label="liked"{...a11yProps(1)} />
          {/* <Tab sx={{marginRight:3 , fontSize:22}} label="Bookmark" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
                    <BCards user={user}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
                    <Liked user={user}/>
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
                    <Bookmarked user={user}/>
      </TabPanel> */}
    </Box>
</div>
:<Typography variant="h4"align="center" sx={{color:"white", margin:4,marginTop:17}}>LOG IN TO ACCESS THE PROFILE</Typography>}

     
    </>
  );
}

export default MyActivity;