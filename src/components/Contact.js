import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";

function Contact() {

    return <section id="aboutpage">
        <div className="abouttext">
            <h1>Contact Info</h1>
            <hr />
            <p>
                Web Application by Emilia Carotti
            </p>
            <p><li>
                <a href="https://www.linkedin.com/in/emiliacarotti/" target="_blank">Linkedin</a>
            </li></p>
            <p><li>
            <a href="https://github.com/emiliacarotti" target="_blank">Github</a>
            </li></p>
            <p>
                Thanks for checking out my website!
            </p>
        </div>
    </section>
}

export default Contact;