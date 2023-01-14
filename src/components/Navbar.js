import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function Navbar({ loggedIn, Logout, isAdmin, setIsAdmin }) {
    return (
        <>
            <Link to="/" className="title">
                <div className='titletext' >p o t s</div><div className='titletext'>b y</div><div className='titletext'>e m i l i a</div>
            </Link>

            <div className="navbarLinks">
                <a href="./"> Home </a>
                <a href="./About"> About </a>
                {isAdmin == "true" ? (<a href="./Create"> Create a Listing </a>) : null}
                {!loggedIn ? <a href="./Login"> Login </a> : <a href onClick={Logout}> Logout </a>}
            </div>
        </>
    )
}