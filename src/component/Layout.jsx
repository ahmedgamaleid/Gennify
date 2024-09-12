import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';


const Layout = (props) => {
  return (
    <>
      <Navbar 
        username={props.username} 
        setIsLogin={props.setIsLogin} 
        islogin={props.islogin} 
        
      />
      <Outlet />
      <Footer/>
    </>
  );
}

export default Layout;
