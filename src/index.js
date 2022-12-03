
import ReactDOM from 'react-dom';
import { App } from './components';

import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";


// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';

import {
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
  Navbar,
  Register,
  SingleItem
} from "./components"

import { user } from 'pg/lib/defaults';


function MadDog() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState([]);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [pottery, setPottery] = useState([]);
  const [selectedPot, setSelectedPot] = useState({})
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
        <center>emilia's pottery </center>
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
              pottery={pottery}
              setPottery={setPottery}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              selectedPot={selectedPot}
              setSelectedPot={setSelectedPot}
            />
          }
        ></Route>



        <Route path="About" element={<About />}></Route>
        <Route path="Cart" element={<Cart />}></Route>
        <Route path="Checkout" element={<Checkout />}></Route>

        <Route
          path="Create"
          element={<Create
            isAdmin={isAdmin}
          />}>
        </Route>

        <Route
          path="Deal"
          element={<Deal
            selectedPot={selectedPot}
            setSelectedPot={setSelectedPot}
          />}>
        </Route>


        <Route path="EditDelete" element={<EditDelete />}></Route>
        <Route path="*" element={<Error />}></Route>
        <Route path="Filters" element={<Filters />}></Route>
        <Route path="Footer" element={<Footer />}></Route>
        <Route path="Header" element={<Header />}></Route>

        <Route
          path="SingleItem"
          element={<SingleItem
            isAdmin={isAdmin}
            selectedPot={selectedPot}
            setSelectedPot={setSelectedPot} />}>
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




