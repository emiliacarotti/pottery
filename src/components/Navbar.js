import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function Navbar({ loggedIn, Logout, isAdmin, setIsAdmin }) {
    return (
        <>
            <div className="title">
                <i className="fa-solid fa-bars fa-xl"></i>
                <Link to="/">
                    <div className="title_image"><img className="home_image" src="https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/logo.png?alt=media&token=4debc1e6-7134-4c9c-bcaa-a0f7f05a44f2"></img></div>
                </Link>
                <i className="fa-solid fa-cart-shopping fa-xl"></i>
            </div>

            <div className="navbarLinks">
                <a href="./"> Home </a>
                <a href="./About"> About </a>

                {isAdmin == "true" ? (<a href="./Create"> Create a Listing </a>) : null}
                {!loggedIn ? <a href="./Login"> Login </a> : <a href onClick={Logout}> Logout </a>}
            </div>
        </>
    )
}