import {useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { IoMdClose } from "react-icons/io";
import { GrHomeRounded } from "react-icons/gr";
import { CiBoxList } from "react-icons/ci";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { MdOutlineCloudDone } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { PiShieldWarningBold } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '../home/Home';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'; // Fixed import

import './nav.css';
import Inventory from '../inventory/Inventory';
import Item from '../item/Item';
import Todo from '../todo/Todo'
import  Support  from '../support/Support'
import Alert from '../alerts/Alert'
import Img from '../../Assets/man.png'
import Img2 from '../../Assets/bell.png'
import classNames from 'classnames';
import Profils from '../profils/Profils';
import Settings from '../settings/Settings';




const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState("home");
  const Menu=['Profile','Settings', 'Logout'];
  const [showOptions, setShowOptions] = useState(false); // State to toggle options visibility
  const [isHovered, setIsHovered] =useState(false);
  const [showNotifications, setShowNotifications] = useState(false);


  // const handleNotificationOnClick = () => {
  //   setShowNotifications(!showNotifications);
  // };
  // const handleNotificationOutClick = () => {
  //   setShowNotifications(showNotifications);
  // };


  const handleLogout = () => {
  
    localStorage.removeItem('userToken');
  
    window.location.href = '/login'; 
  };



  const handleProfileClick = (menu) => {
    setShowOptions(!showOptions);
    if (menu === 'Logout') {
      handleLogout();
    }else if(menu === 'Settings'){
      setMenuData("settings")
    }else if(menu ==='Profile'){
      setMenuData("profils")
    } 
    else {
      setShowOptions(!showOptions); // Toggle options visibility
    }
  };



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: "#FFFFFF", color: "#000000" }}>
  <Toolbar>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={() => setOpen(!open)}
      edge="start"
    >
      <MenuIcon />
    </IconButton>
    <Box sx={{ marginLeft: 3, cursor:"pointer" }} onClick={() => setMenuData("home")}>
    <Typography variant="h6" noWrap component="div">
        Expiration Reminder
    </Typography>
</Box>


    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 3 }}>
    <div className={`bell__icon ${isHovered ? 'bell__animation' : ''}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowNotifications(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowNotifications(false);
      }}
  >
  <MdOutlineNotificationsActive/>
</div>
{showNotifications && (
  <div className="notification__drawer">
              <Typography>No notifications</Typography>

  </div>
)}
      <div className="profil__content">
        <div className=''>
          <img src={Img} alt="Profile Icon" className='profil__pic' onClick={handleProfileClick} />
        </div>
        {showOptions && ( // Conditionally render options based on showOptions state
                <div className="profile-options">
                  <ul>
                    {Menu.map((menu) => (
                    <li key={menu} onClick={() => handleProfileClick(menu)}>{menu}</li>
                   ))}
                  </ul>
                </div>
              )}
            </div>
    </Box>
  </Toolbar>
</AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <IoMdClose />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenuData("home")}>
              <ListItemButton
                sx={{
                  top:15,
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 3.5,
                  Color: menuData === "home" ? 'red' : 'transparent', // Change background color to red if it's the current menu item

                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    fontSize: 22
                  }}
                >
                  <GrHomeRounded />
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                <IoIosArrowForward />

              </ListItemButton>
            </ListItem>

            
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenuData("inventory")} >
              <ListItemButton
                sx={{
                  top:15,
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 3.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    fontSize: 22
                  }}
                >
                  <CiBoxList />
                </ListItemIcon>
                <ListItemText primary="Invertory" sx={{ opacity: open ? 1 : 0 }} />
                <IoIosArrowForward />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenuData("item")} >
              <ListItemButton
                sx={{
                  top:15,
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 3.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    fontSize: 22
                  }}
                >
                  <HiOutlineBellAlert />
                </ListItemIcon>
                <ListItemText primary="Reminders" sx={{ opacity: open ? 1 : 0 }} />
                <IoIosArrowForward />

              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenuData("alert")} >
              <ListItemButton
                sx={{
                  top:15,
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 3.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    fontSize: 22
                  }}
                >
                  <PiShieldWarningBold />
                </ListItemIcon>
                <ListItemText primary="Alerts" sx={{ opacity: open ? 1 : 0 }} />
                <IoIosArrowForward />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenuData("todo")}>
      <ListItemButton
        sx={{
          top:15,
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 3.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            fontSize: 22
          }}
        >
          {/* Icon for logout button */}
          <MdOutlineCloudDone />
        </ListItemIcon>
        <ListItemText primary="Todo" sx={{ opacity: open ? 1 : 0 }} />
        <IoIosArrowForward />
      </ListItemButton>
      
    </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenuData("support")} >
              <ListItemButton
                sx={{
                  top:15,
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 3.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    fontSize: 22
                  }}
                >
                  <BiSupport />
                </ListItemIcon>
                <ListItemText primary="Support" sx={{ opacity: open ? 1 : 0 }} />
                <IoIosArrowForward />
              </ListItemButton>
            </ListItem>

          
        </List>
        <Divider sx={{ paddingTop : 1 }} />


        <div className={`nav__test ${open ? 'visible' : ''}`}>
          <div className="nav__title">
            <p className="test__title">Send Test<br/> Reminder</p>
            <button className='test__button'> Try</button>
          </div>
          <img src={Img2} alt="bell" className='test__pic' />
        </div>
            

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {menuData==="home" && <Home />}
        {menuData==="inventory" && <Inventory />}
        {menuData==="item" && <Item />}
        {menuData==="profils" && <Profils />}
        {menuData==="settings" && <Settings />}

        {menuData==="alert" && <Alert />}
        {menuData==="support" && <Support />}
        {menuData==="todo" && <Todo />}

      </Box>
      
    </Box>
    
  );
}
