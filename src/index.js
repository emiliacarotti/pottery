
import ReactDOM from 'react-dom';
import { App } from './components';

import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";


// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';

import{
  Navbar,
  Login,
  Register,
  Home,
  Error
} from "./components"

function MadDog() {
    // const [loggedIn, setLoggedIn] = useState(false);
    // const [token, setToken] = useState("");
    // const [profile, setProfile] = useState([]);
    // const [username, setUsername] = useState("");
    // const navigate = useNavigate();
  
    // useEffect(() => {
    //   let savedToken = localStorage.getItem("token");
    //   let currentUsername = localStorage.getItem("username");
    //   setUsername(currentUsername);
    //   if (savedToken) {
    //     setLoggedIn(true);
    //     setToken(savedToken);
    //   }
    // }, []);
  
    // function Logout() {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("username");
    //   setLoggedIn(false);
    //   setToken("");
    //   setUsername("");
    //   navigate("/")
    // }
  
    // console.log("hello");
    // return (
    //   <>
    //     <Navbar loggedIn={loggedIn} Logout={Logout} />
    //     <Routes>
          
    //       <Route
    //         path="Login"
    //         element={
    //           <Login
    //             username={username}
    //             setUsername={setUsername}
    //             token={token}
    //             setToken={setToken}
    //             setLoggedIn={setLoggedIn}
    //           />
    //         }
    //       ></Route>
    //       <Route
    //         path="Register"
    //         element={
    //           <Register
    //             token={token}
    //             setToken={setToken}
    //             setLoggedIn={setLoggedIn}
    //           />
    //         }
    //       ></Route>
    //       <Route
    //         path="/"
    //         element={<Home profile={profile} setProfile={setProfile} />}
    //       ></Route>
          
    //       <Route path="*" element={<Error />}></Route>
          
    //     </Routes>
    //   </>
    // );
    return(
      <>hello</>
    )
  }


  
  const root = reactdomclient.createRoot(document.getElementById("app"));
  root.render(
    <BrowserRouter>
      <MadDog />
    </BrowserRouter>
  );

//ReactDOM.render(<MadDog />, document.getElementById('root'));
