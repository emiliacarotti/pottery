import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "../images/critter.png";
export default function Navbar({loggedIn, Logout}){
    return (
        <div className="navbar">
            <a href="/"><img className="logo" src={logo} width= "250px"/>
            </a>
            
        

  	<input class="menu-icon" type="checkbox" id="menu-icon" name="menu-icon"/>
  	<label for="menu-icon"></label>
  	<nav class="nav"> 		
  		<ul class="pt-5">
        <li><a href="/"> Home </a></li>
        <li><a href="Login"> Login </a></li>
        <li><a href="Deal"> Beast of the Month </a></li>
        <li><a href="About"> About Us </a></li>
        <li><a href="Cart"> My Cart </a></li>
  		</ul>
  	</nav>
        </div>
    )
}