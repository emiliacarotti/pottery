import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";

function About() {

    return <section id="about">
        <div className="about-1">
            <h1>About</h1>
            <hr />
            <p>In 2021, I discovered I was really into pottery. Like, really into it.
                Something about pouring hours and hours hunched over a pottery wheel
                (this is really good for my back pain) into making a single mug just
                really plays into my preferred ways to spend my time. Even when the mug
                does crack at the final stages of firing or glazing... </p>
            <p>In 2022, I discovered my love for coding. It's actually kind of weird how similar
                the two are. They both require attention to detail, creativity, persistance to completion, uncanny precision,
                and they both fuel my back pain! At the very least they're both keeping my chiropractor in business.</p>
            <p> But from then on, it was really a no-brainer - why not combine the two? Introducing pots by emilia, where I make the pottery
                AND the website I get to sell it on! As if that wasn't exciting enough,
                10% of all proceeds go to charity!!! Thanks for stopping by, it means a lot to me. And to my chiropractor.
            </p>
        </div>

    </section>
}

export default About;