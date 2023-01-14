import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";

function About() {

    return <section id="aboutpage">
        <div className="abouttext">
            <h1>About</h1>
            <hr/>
            <p>
                Welcome to my full stack e-commerce website!
            </p>
            <p>
                I put this personal project together to demonstrate my ability
                to design a full stack web application.
            </p>
            <p>
                This app is built from a Postgres database and uses APIs via AJAX,
                Node and Express in Javascript. The front end is fully outfitted with React.
            </p>
            <p>
                On this app, you can either login as a regular
                user or as an Admin, which will give you additional permissions, such as editing or deleting
                an existing listing, or creating a new listing. Feel free to create your own account (which
                will be a regular user) or try out the Admin credentials below, to test out these additional features:
                <p className = "smalltext" >&nbsp; &nbsp; &nbsp; &nbsp;  Username: admin</p>
                <p className = "smalltext" >&nbsp; &nbsp; &nbsp; &nbsp;  Password: admin</p>
            </p>
            <p>
                Thanks for checking out my website!
            </p>
        </div>
    </section>
}

export default About;