const express = require('express');
const cartRouter = express.Router();
const { requireUser } = require('./utils');

const { 
    getUserCart,
    createCart
  } = require('../db/cart');

  cartRouter.use((req, res, next) => {
    console.log(req.body);
    
    next();
    });

// GET /api/cart
cartRouter.get("/", async (req, res, next)=>{
    try {
        const userCart = await getUserCart();
        res.send(userCart);
    }catch(error){
        console.error(error)
    }
});

cartRouter.get("/", async (req, res, next)=>{
    try {
        const createACart = await createCart(cartid);
        res.send(createACart);
    }catch(error){
        console.error(error)
    }
});
module.exports = cartRouter;