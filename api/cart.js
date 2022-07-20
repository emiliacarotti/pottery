const express = require('express');
const cartRouter = express.Router();



const { requireUser } = require('./utils');

const { 
    getUserCart
  } = require('../db');

/*
// GET /api/cart
cartRouter.get("/", async (req, res, next)=>{
    try {
        const userCart = await getUserCart(uesrname);
        res.send(allcart);
    } catch ({name, message}) {
        next ({name, message});
    }
});
*/


module.exports = cartRouter;
