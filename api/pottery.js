const express = require("express");
const potteryRouter = express.Router();
const { requireUser } = require("./utils");

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {
  getAllPottery,
  createPot,
  updatePot,
  deletePot,
  getPotById
} = require("../db/pot");

potteryRouter.use((req, res, next) => {
  console.log(req.body);

  next();
});

// Get all Pottery /api/pottery
potteryRouter.get("/", async (req, res, next) => {

  try {
    const allPottery = await getAllPottery();
    console.log("all pottery got")
    if (allPottery) {
      res.send(
        allPottery
      )

    } else {
      res.send({
        message: "Error getting pottery."
      })
    };

  } catch (error) {
    next(error);
  }
});

// GET /api/pottery/:potid
potteryRouter.get('/:potid', async (req, res, next) => {

  try {
    const pot = await getPotById(req.params.potid);
    res.send(pot);

  } catch (error) {
    console.log("createbyid", error);
    next(error)
  }
})

// Create a new pottery listing
potteryRouter.post('/create', async (req, res, next) => {
  const { name, price, stock, image } = req.body;
  console.log("in api")

  try {
    if (true) {
      if (!name || !price || !stock || !image) {
        next({
          name: "MissingDataError",
          message: "Please provide all info for this pot."
        });
      }

      else {
        console.log("req", req.body)
        const newPot = await createPot({ name, price, stock, image });
        res.send(newPot);
      }
    }

    else {
      next({
        name: 'NoUserError',
        message: 'You must be an admin.'
      });
    }

  } catch (error) {
    next(error)
  }
})

// Patch edit pottery listing
potteryRouter.patch('/edit/:potid', async (req, res, next) => {

  try {
    const { potid, name, price, stock } = req.body;
    if (!name || !price || !stock) {
      next({
        name: "MissingDataError",
        message: "Please provide all info for this pot."
      });

    } else {
      const editPot = await updatePot(potid, name, price, stock);
      res.send(editPot);
      console.log('update complete')
    }

  } catch ({ name, message }) {
    next({ name, message })
  }
})

// Delete pottery listing
potteryRouter.delete('/:potid', async (req, res, next) => {

  try {
    console.log("req params", req.params.potid)
    const deletedPot = await deletePot(req.params.potid);
    res.send(deletedPot);

  } catch ({ name, message }) {
    next({ name, message })
  }
})

// Export Pottery Router
module.exports = potteryRouter;