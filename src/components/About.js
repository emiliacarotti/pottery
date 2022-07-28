import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";

function About(){
    
    return  <section id="about">
                <div class="about-1">
                    <br>
                    </br>
                    <br>
                    </br>
                    <h1>About Us</h1>
                    <hr/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis cras sed felis eget velit aliquet sagittis id.</p>
                </div>
                <div id="about-2">
                    <div class="content-box-lg">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="about-item">
                                        <i class="fa fa-skull"></i>
                                        <h3>Monster Mission</h3>
                                        <hr/>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis cras sed felis eget velit aliquet sagittis id.</p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="about-item">
                                        <i class="fa fa-earth-americas"></i>
                                        <h3>Where We Are</h3>
                                        <hr/>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis cras sed felis eget velit aliquet sagittis id. Venenatis cras sed felis eget velit aliquet sagittis id. Venenatis cras sed felis eget velit aliquet sagittis id.</p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="about-item">
                                        <i class="fa fa-helmet-safety"></i>
                                        <h3>Safety Measures</h3>
                                        <hr/>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis cras sed felis eget velit aliquet sagittis id. Venenatis cras sed felis eget velit aliquet sagittis id. Venenatis cras sed felis eget velit aliquet sagittis id.</p>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                
            </section>
}

export default About;