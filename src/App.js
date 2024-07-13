import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'; // Fixed import
import './App.css';
import Login from './Compenents/login/Login';
import Register from './Compenents/register/Register';
import Home from './Compenents/home/Home';
import SideNavBar from './Compenents/navbar/SideNavBar';
import Inventory from './Compenents/inventory/Inventory';


function App() {
  return (
      <BrowserRouter>
      <ConditionalNavBar />
      <Routes> 
        <Route path='/' element={<Register />}/>
        <Route path='register' element={<Register />}/>
        <Route path='login' element={<Login />} />
        {/* <Route path='home' element={<Home />} />
         <Route path='inventory' element={<Inventory />}/> */}


      </Routes>
      </BrowserRouter>
  );
}

function ConditionalNavBar() {
  const location = useLocation();
  
  // List of paths where the navbar should not appear
  const noNavBarPaths = ["/", "/login", "/register"];
  
  // Check if the current path is in the list of paths where navbar should not appear
  if (noNavBarPaths.includes(location.pathname)) {
    return null; // Return null when navbar should not be displayed
  }

  return <SideNavBar />;
}

export default App;
