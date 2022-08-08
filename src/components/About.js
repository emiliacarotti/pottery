import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";

function About(){
    
    return  <section id="about">
                <div className="about-1">
                    <br>
                    </br>
                    <br>
                    </br>
                    <h1>About Us</h1>
                    <hr/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis cras sed felis eget velit aliquet sagittis id.</p>
                </div>
                <div id="about-2">
                    <div className="content-box-lg">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="about-item">
                                        <i className="fa fa-skull"></i>
                                        <h3>Monster Mission</h3>
                                        <hr/>
                                        <p>Just like Hoover's campaign slogan "A Chicken for Every Pot", we feel that "A Beast in Every House" is an admirable business slogan. We will be working tirelessly to bring you the beast that you deserve at a price you can afford.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="about-item">
                                        <i className="fa fa-earth-americas"></i>
                                        <h3>Where We Ship</h3>
                                        <hr/>
                                        <p>Ittoqqortoormiit, Greenland. Oymyakon, Russia. Barrow, Alaska. Changtang, Tibet. Pyongyang, North Korea. Those are a few of the more remote locations that we have shipped our beast to. So in other words we've got you covered from pole to pole.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="about-item">
                                        <i className="fa fa-helmet-safety"></i>
                                        <h3>Safety Measures</h3>
                                        <hr/>
                                        <p>Ok, this is a big one. Please, please, please follow the safety recommendations shipped with your beast. If we suggest not to get your beast wet or feed it after midnight... it's probably best not to get it wet or feed it after midnight. These are rules for a reason folks. </p>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                
            </section>
}

export default About;