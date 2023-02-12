import { Routes, Route, Link, Navigate } from "react-router-dom";
import OpenScreen from "./component/openScreen";
import Signup from "./component/signup";
import Login from "./component/login";
import NewsFeed from "./component/newsFeed";
import UserList from "./component/userList";
import Contact from "./component/Contact";
import Profile from "./component/profile";
import ChangePassword from "./component/changePassword"
import ForgetPassword from "./component/forgetPassword"
import ChatScreen from "./component/chatScreen";
import AddProduct from "./component/addProduct"
import Setting from "./component/setting"


import { useContext } from "react";
import { GlobalContext } from './context/Context';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import CircularProgress from '@mui/material/CircularProgress';


import { useState } from 'react';
import axios from 'axios';
import "./App.css";
import { useEffect } from "react";





function App() {
   let { state, dispatch } = useContext(GlobalContext);

   console.log("state: ", state);



   const logout = async () => {

      console.log('clicked')

      try {
         let response = await axios.post(`${state.baseUrl}/logout`, {}, {
            withCredentials: true
         });
         console.log('response: ', response);
         dispatch({ type: 'USER_LOGOUT' });

      }
      catch (error) {

         console.log('error: ', error)

         dispatch({ type: 'USER_LOGIN' });
      }


   }

   let profileCheck = async () => {
      try {
         let response = await axios.get(`${state.baseUrl}/profile`, {
            withCredentials: true
         })

         console.log("response: ", response);

         if (response?.data?.isAdmin) {
            dispatch({
               type: 'ADMIN_LOGIN', payload: response.data
            })
         }
         else {

            dispatch({
               type: 'USER_LOGIN', payload: response.data
            })
         }
      } catch (error) {

         console.log("axios error: ", error);

         dispatch({
            type: 'USER_LOGOUT'
         })
      }
   }

   useEffect(() => {
      profileCheck()
   }, []);
   useEffect(() => {
      // Add a request interceptor
      axios.interceptors.request.use(function (config) {
         // Do something before request is sent

         config.withCredentials = true

         return config;
      }, function (error) {
         // Do something with request error
         return Promise.reject(error);
      });

      // Add a response interceptor
      axios.interceptors.response.use(function (response) {
         // Any status code that lie within the range of 2xx cause this function to trigger
         // Do something with response data
         return response;
      }, function (error) {

         if (error.response.status === 401) {
            dispatch({
               type: 'USER_LOGOUT'
            });
         }
         // Any status codes that falls outside the range of 2xx cause this function to trigger
         // Do something with response error
         return Promise.reject(error);
      });
   }, [])

   return (
      <div className="main">
         <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
               <Toolbar>
                  <IconButton
                     size="large"
                     edge="start"
                     color="inherit"
                     aria-label="open drawer"
                     sx={{ mr: 2 }}
                  >
                     <MenuIcon />
                  </IconButton>
                  <Typography
                     variant="h6"
                     noWrap
                     component="div"
                     sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                  >
                  </Typography>
                  {
                     (!state?.isLogin && !state?.adminLogin) ?
                        <ul className="nav">
                           <li>
                              <Link to={'/'}>Login</Link>
                           </li>
                           <li>
                              <Link to={'/signup'}>Signup</Link>
                           </li>
                        </ul>
                        :
                        null
                  }
                  {
                     (state?.isLogin === true) ?
                        <ul className="nav">
                           <li>
                              <Link to={'/'}>UserList</Link>
                           </li>
                           <li>
                              <Link to={'/profile'}>Profile</Link>
                           </li>
                           <li>
                              <button><Link to={'/change-password'}>Change Password</Link></button>
                           </li>
                        </ul>
                        :
                        null
                  }
                  {
                     (state?.isAdmin === true) ?
                        <ul className="nav">
                           <li>
                              <Link to={'/'}>Home</Link>
                           </li>
                           <li>
                              <Link to={'/profile'}>Add Item</Link>
                           </li>
                           <li>
                              <button><Link to={'/change-password'}>Account</Link></button>
                           </li>
                        </ul>
                        :
                        null
                  }

                  {
                     (state.isLogin === true) ?
                        <IconButton onClick={() => {
                           logout()
                        }}><LogoutIcon /></IconButton>
                        :
                        null
                  }





               </Toolbar>
            </AppBar>
         </Box>
         {
            (!state?.isLogin && !state.adminLogin) ?
               <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forget-password" element={<ForgetPassword />} />
                  <Route path="*" element={<Navigate to="/" replace={true} />} />
               </Routes>
               :
               null
         }
         {
            (state?.isLogin && state.adminLogin) ?
               <Routes>
                  <Route path="/" element={<UserList />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/chat/:id" element={<ChatScreen />} />
                  <Route path="/change-password" element={<ChangePassword />} />
                  <Route path="*" element={<Navigate to="/" replace={true} />} />
               </Routes>
               :
               null
         }
         {
            (state?.isLogin === null && state?.adminLogin === null ) ?
               <div style={{ display: "flex", justifyContent: 'center', alignItem: 'center', minHeight: '100%', minWidth: '100%', marginTop: "100px" }}><CircularProgress size={400} /></div>
               :
               null
         }
      </div>
   );
}

// function App () {
//    return(
//       <div>
//          <Login/>
//       </div>
//    )
// }


export default App;