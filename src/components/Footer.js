import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";

function Footer(){
    return <div className="social-footer">
        <section className="footer">
            <div className="social">
                <a href="https://www.instagram.com/?hl=en"><i className="fab fa-instagram"></i></a>
                <a href="https://www.snapchat.com/"><i className="fab fa-snapchat"></i></a>
                <a href="https://twitter.com/?lang=en"><i className="fab fa-twitter"></i></a>
                <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
            </div>
            <ul className= "list">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="../About">About Us</a>
                </li>
                <li>
                    <a href="#">Services</a>
                </li>
                <li>
                    <a href="#">Payment Methods</a>
                </li>
                <li>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Privacy Policy</a>
                </li>
            </ul>
            <p className= "copyright">
            © twenty twenty-two by Team MadDog
            </p>
        </section>
    </div>

}

export default Footer;