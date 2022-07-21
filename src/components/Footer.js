import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";

function Footer(){
    return <div className="footer">© twenty twenty-two by <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Team MadDog</a></div>

}

export default Footer;