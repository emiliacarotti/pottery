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
                <p>Butter Bot is a robot designed by Rick Sanchez from Earth C-137. It's primary purpose is to pass the butter.</p>
                <h6><strike>$749.99</strike></h6>
                <div className="blink"><h6>Now only $649.99</h6></div>
            <ul>
                <li><i class="fa fa-star checked"></i></li>
                <li><i class="fa fa-star checked"></i></li>
                <li><i class="fa fa-star checked"></i></li>
                <li><i class="fa fa-star checked"></i></li>
                <li><i class="fa fa-star-half"></i></li>
            </ul>
            <button className="inputMOTM"> <a href="./Cart"> Buy Now <i class='fa fa-cart-shopping'></i></a></button>
        </div>
        </div>
    </div>)
}

export default Deal;