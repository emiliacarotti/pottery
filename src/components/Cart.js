import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";
import butterbot from "../images/butterbot.png";
function Cart(){
    return (
    <>
    <div className="border">
    <div className="shopping-cart">
        <div className="title">
            Shopping Cart
        </div>
        <div className="item">
            <div className="buttons">
            <h2><i class="fa-solid fa-trash"></i></h2>
            
            </div>
            
            <div className="image">
                <img src={butterbot} alt="" width="230px"/>
            </div>
            
            {/* <div className="description">
                <span>Cthulhu</span>
                <span>Great Old One</span>
                <span>Telepathic</span>
            </div> */}
            
            
            <div className="quantity">
                
                <button className="plus-btn" type="button" name="button">
                <i class="fa-solid fa-minus"></i>
                </button>
                
                <input type="text" name="name" value="1"/>
                    
                    <button className="minus-btn" type="button" name="button">
                    <i class="fa-solid fa-plus"></i>
                    </button>
            </div>

            <div className="total-price"><b>Cart Total=</b>$649.99</div>
        </div>
       
    </div> 
    <div className="cartpage">
    <center><div className="checkout">Ready to checkout?</div></center>
    <center><button className="checkout-btn"> Checkout </button></center>
    <center>Sign up for our newsletter to recieve a 15% off code!</center>
    <center><input className="reminder" placeholder="Email"></input></center>
    <center><button className="checkout-btn">Sign Up</button></center>
    </div></div>
    </>
    )
}

export default Cart;