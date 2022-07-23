import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "../images/scientist.png";
export default function Navbar({loggedIn, Logout}){
    return (
        <div className="nav">
            <a href="/"><img className="logo" src={logo} width= "85px"/>
            </a>
            
        

  	<input class="menu-icon" type="checkbox" id="menu-icon" name="menu-icon"/>
  	<label for="menu-icon"></label>
  	<nav class="nav"> 	
        <>
            <ul class="pt-5">
            <li><a><Link to="/"> Home </Link></a></li>
            {
            <li><a><Link to="Create"> Create New Item </Link> </a></li>//this needs to be a boolean, available to Admins ONLY
            }
            {
            !loggedIn?<li><a><Link to="Login"> Login </Link> </a></li> : <li><a> <button onClick={Logout}> Logout</button> </a></li>
            }
            <li><a><Link to="Deal"> Beast of the Month </Link></a></li>
            <li><a><Link to="About"> About Us </Link></a></li>
            <li><a><Link to="Cart"> My Cart </Link></a></li>
            </ul>
        </>	
  	</nav>
        </div>
    )
}