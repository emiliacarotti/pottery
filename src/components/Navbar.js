import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "../images/critter.png";
export default function Navbar({loggedIn, Logout, isAdmin, setIsAdmin}){
    return (
        <div className="navbar">
            <a href="/"><img className="logo" src={logo} width= "230px"/>
            </a>
            
        

  	    <input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon"/>
  	    <label htmlFor="menu-icon"></label>

  	    <nav className="nav"> 	
            <>
                <ul className="pt-5">
                <li><a href="/"> Home </a></li>
                {
                isAdmin?<li><a href="./Create"> Create New Creature Listing </a></li> : null
                }
                {
                !loggedIn?<li><a href="./Login"> Login </a></li> : <li><a href onClick={Logout}> Logout </a></li>
                }
                <li><a href="./Deal"> Beast of the Month </a></li>
                <li><a href="./About"> About Us </a></li>
                <li><a href="./Cart"> My Cart </a></li>
                </ul>
            </>	

  	    </nav>
        </div>
    )
}