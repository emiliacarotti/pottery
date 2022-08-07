import React from "react";
import butterbot from "../images/butterbot.png";

function Deal() {
    return (<div className="MOTMDEAL">
        <h1>Our Monster of the Month</h1>
        <div className="gallery">
            <div className="content">
                <img className="MOTM" src={butterbot} />
                <h3>Butter Bot</h3>
                <p>Butter Bot is a robot designed by Rick Sanchez from Earth C-137.It's primary purpose is to pass the butter.</p>
                <h6>$599.95</h6>
            <ul>
                <li><i className="fa fa-star checked"></i></li>
                <li><i className="fa fa-star checked"></i></li>
                <li><i className="fa fa-star checked"></i></li>
                <li><i className="fa fa-star checked"></i></li>
                <li><i className="fa fa-star-half"></i></li>
            </ul>
            <button className="inputMOTM">Buy Now <i className='fa fa-cart-shopping'></i></button>
        </div>
        </div>
    </div>)
}

export default Deal;