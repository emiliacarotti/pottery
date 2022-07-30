import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";
import butterbot from "../images/butterbot.png";


function Deal(){
    return ( <div className="MOTMDEAL">
        <h1>Our Monster of the Month</h1>
        <div className="gallery">
            <div className="content">
                <img className="MOTM" src={butterbot}/>
                <h3>Butter Bot</h3>
                <p>Butter Bot is a robot designed by Rick Sanchez from Earth C-137.It's primary purpose is to pass the butter.</p>
                <h6>$599.95</h6>
            <ul>
                <li><i class="fa fa-star checked"></i></li>
                <li><i class="fa fa-star checked"></i></li>
                <li><i class="fa fa-star checked"></i></li>
                <li><i class="fa fa-star checked"></i></li>
                <li><i class="fa fa-star-half"></i></li>
            </ul>
            <button className="inputMOTM">Buy Now <i class='fa fa-cart-shopping'></i></button>
        </div>
        </div>
    </div>)
}

export default Deal;