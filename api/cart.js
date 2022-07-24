const express = require('express');
const cartRouter = express.Router();

const { requireUser } = require('./utils');

const { 
    getUserCart,
    createCart
  } = require('../db/cart');


// GET /api/cart
cartRouter.get("/", requireUser, async (req, res, next)=>{
    try {
        const userCart = await getUserCart(uesrname);
        res.send(userCart);
    } catch ({name, message}) {
        next ({name, message});
    }
});

cartRouter.get("/", requireUser, async (req, res, next)=>{
    try {
        const createCart = await createCart(cartid);
        res.send(createCart);
    } catch ({name, message}) {
        next ({name, message});
    }
});
module.exports = cartRouter;