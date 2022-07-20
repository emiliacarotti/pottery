const express = require('express');
const historyRouter = express.Router();

// const { requireUser } = require('./utils');

// const { 
//     getUserHistory
//   } = require('../db');

//   //GET/api/history
//   historyRouter.get("/", async (req, res, next)=>{
//     try {
//         const userHistory = await getUserHistory();
//         res.send(userHistory);
//     } catch ({name, message}) {
//         next ({name, message});
//     }
// });

module.exports = historyRouter;
