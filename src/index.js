
import ReactDOM from 'react-dom';
import { App } from './components';

import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";


// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';

import{
  About,
  Cart,
  Checkout,
  Create,
  Deal,
  EditDelete,
  Error,
  Filters,
  Footer,
  Header,
  Home,
  Login,
  MyProfile,
  Navbar,
  Register,
  SingleItem
} from "./components"
import { set } from 'express/lib/application';

function MadDog() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [profile, setProfile] = useState([]);
    const [username, setUsername] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);  
    const [creatures, setCreatures] = useState([]);
    const [selectedCreature, setSelectedCreature] = useState({})
    const navigate = useNavigate();
  
    useEffect(() => {
      let savedToken = localStorage.getItem("token");
      let currentUsername = localStorage.getItem("username");
      setUsername(currentUsername);
      if (savedToken) {
        setLoggedIn(true);
        setToken(savedToken);
      }
    }, []);

    useEffect(() => {
      setIsAdmin(localStorage.getItem("isadmin"))
    }, [username, isAdmin, setLoggedIn, loggedIn]);
  
    function Logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.setItem("isadmin", false);
      setIsAdmin(false)
      setLoggedIn(false);
      setToken("");
      setUsername("");
      navigate("/")
    }
    
    return (
      <>
      
        <Navbar 
          loggedIn={loggedIn} 
          Logout={Logout} 
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
        <br></br>
        <br></br>
        <div className='Header'>
        <center>Beast Bazzaar </center>
        
        </div>
        
        <Routes>
          
          <Route
            path="Login"
            element={
              <Login
                username={username}
                setUsername={setUsername}
                token={token}
                setToken={setToken}
                setLoggedIn={setLoggedIn}
                setIsAdmin={setIsAdmin}
              />
            }
          ></Route>
          <Route
            path="Register"
            element={
              <Register
                token={token}
                setToken={setToken}
                setLoggedIn={setLoggedIn}
              />
            }
          ></Route>
          <Route
            path="/"
            element={
              <Home 
                creatures={creatures} 
                setCreatures={setCreatures} 
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
                selectedCreature={selectedCreature}
                setSelectedCreature={setSelectedCreature}
              />
            }
          ></Route>


          
          <Route path="About" element={<About />}></Route>
          <Route path="Cart" element={<Cart />}></Route>
          <Route path="Checkout" element={<Checkout />}></Route>
          <Route path="Create" element={<Create />}></Route>           

          <Route
           path="Deal" 
           element={<Deal 
            selectedCreature={selectedCreature}
            setSelectedCreature={setSelectedCreature}/>}>
           </Route>


          <Route path="EditDelete" element={<EditDelete
          selectedCreature = {selectedCreature}
          setSelectedCreature = {setSelectedCreature}
          loggedIn = {loggedIn}
          isAdmin = {isAdmin}
          setIsAdmin = {setIsAdmin}
           />}></Route>
          <Route path="*" element={<Error />}></Route>
          <Route path="Filters" element={<Filters />}></Route>
          <Route path="Footer" element={<Footer />}></Route>
          <Route path="Header" element={<Header />}></Route>

          <Route 
            path="SingleItem" 
            element={<SingleItem 
              selectedCreature={selectedCreature}
              setSelectedCreature={setSelectedCreature}
              isAdmin = {isAdmin}
              setIsAdmin = {setIsAdmin}/>}>
            </Route>

          <Route 
            path="MyProfile" 
            element={<MyProfile  
              username={username}
              setUsername={setUsername}
              token={token}
              setToken={setToken}
              setLoggedIn={setLoggedIn}/>}>
            </Route>

          
          
        </Routes>

        <Footer />
      </>
    );
    
  }


  
  const root = reactdomclient.createRoot(document.getElementById("app"));
  root.render(
    <BrowserRouter>
      <MadDog />
    </BrowserRouter>
  );

//ReactDOM.render(<MadDog />, document.getElementById('root'));




  