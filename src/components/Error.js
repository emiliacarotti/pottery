import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";

function Error(){
    return (<div className="Error-gif"><center><iframe src="https://giphy.com/embed/xT9IgvEOwRzUcZDRiU" width="598" height="408" frameBorder="0"  allowFullScreen></iframe><div></div>Oh.... Hello, Georgie! You shouldn't be here. </center></div>
            
    )
    
   
           
}

export default Error;