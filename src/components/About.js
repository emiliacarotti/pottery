import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";

function About() {

    return <section id="aboutpage">
        <div className="abouttext">
            <h1>About</h1>
            <hr />
            <p>In 2021, I discovered I was really into pottery. Like, really into it.
                Something about pouring hours and hours hunched over a pottery wheel
                (this is really good for my back pain) playing with dirt just
                really plays into my preferred ways to spend my time. But really,
                there's something extremely rewarding about pulling a mug out of the
                kiln weeks later and finally seeing how it's turned out. </p>

            <p>And in 2022, I discovered my love for coding. It turns out the two are actually pretty
                similar. The extreme attention to detail and precision, the creative outlet
                they provide, the hours bent over a machine just twiddling away with your fingers...
                At the very least they're both keeping my chiropractor in business.</p>

            <p> From then on, it was really a no-brainer - why not combine the two? Now I make the pottery
                AND the website I get to sell it on! And as if that wasn't exciting enough,
                10% of all proceeds go to charity! Check out the Charity tab for a status on 
                how much we've raised so far.Thanks for stopping by, it means a lot to me. And to my chiropractor.
            </p>

            <p> Thanks for stopping by. It means a lot to me. And to my chiropractor.
            </p>
        </div>
    </section>
}

export default About;