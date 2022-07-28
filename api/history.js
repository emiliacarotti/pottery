const express = require('express');
const historyRouter = express.Router();

const { requireUser } = require('./utils');

const { 
    getUserHistory,
    createOrderHistory
  } = require('../db/history');

historyRouter.use((req, res, next) => {
    console.log(req.body);
    
    next();
    });

  //GET/api/history
  historyRouter.get("/", async (req, res, next)=>{
    try {
        const userHistory = await getUserHistory();
        res.send(userHistory);
    }catch(error){
        console.error(error)
    }
});

//CREATE HISTORY    
historyRouter.get("/",async (req, res, next) => {
    try{
    const orderHistoryToCreate = await createOrderHistory(historyid);
    res.send(orderHistoryToCreate);
    }catch(error){
        console.error(error)
    }
});

module.exports = historyRouter;
