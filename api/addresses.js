const express = require('express');
const addressesRouter = express.Router();
const { requireUser } = require('./utils');

const {
    getAddresses,
    createAddresses
} = require('../db/address');

addressesRouter.use((req, res, next) => {
    console.log(req.body);

    next();
});

// Get Address
addressesRouter.get("/", async (req, res, next) => {

    try {
        const address = await getAddresses();
        res.send(address);

    } catch (error) {
        console.error(error)
    }
});

// Create Address    
addressesRouter.get("/", async (req, res, next) => {

    try {
        const addresscreate = await createAddresses(addressid);
        res.send(addresscreate);

    } catch (error) {
        console.error(error)
    }
});

// Export Address Router
module.exports = addressesRouter;