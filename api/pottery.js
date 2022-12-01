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

// get all pottery
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

// //GET /api/creatures/:potid
potteryRouter.get('/:potid', async (req, res, next) => {

  try {
    //console.log(req.params.potid)
    const pot = await getPotById(req.params.potid);
    //console.log(pot)
    res.send(pot);

  } catch (error) {
    console.log("createbyid", error);
    next(error)
  }
})

//working
// create a pot
potteryRouter.post('/create', async (req, res, next) => {
  const { name, price, stock, size, image } = req.body;
  console.log("in api")
  try {
    if (true) { //user is an admin, idk if this is right
      if (!name || !price || !stock || !size || !image) { //if data is missing
        next({
          name: "MissingDataError",
          message: "Please provide all info for this pot."
        });

      }
      else {
        // create pot
        console.log("req", req.body)
        const newPot = await createPot({ name, price, stock, size, image });
        res.send(newPot);

      }
    }
    else { //user is not an admin 
      next({
        name: 'NoUserError',
        message: 'You must be an admin.'
      });

    }

  } catch (error) {
    next(error)
  }
})
// //PATCH
potteryRouter.patch('/edit/:potid', async (req, res, next) => {
  try {
    // console.log("req1", req.body)
    const { potid, name, price, stock, size } = req.body;
    if (!name || !price || !stock || !size ) { //if data is missing
      next({
        name: "MissingDataError",
        message: "Please provide all info for this pot."
      });
    } else {
      // update creature
      // console.log("req2", req.body)
      const editPot = await updatePot(potid, name, price, stock, size );
      res.send(editPot);
      console.log('update complete')
    }
  } catch ({ name, message }) {
    next({ name, message })
  }
})

// // Delete Creature
potteryRouter.delete('/:potid', async (req, res, next) => {
  try {

    console.log("req params", req.params.potid)
    const deletedPot = await deletePot(req.params.potid);
    res.send(deletedPot);
  } catch ({ name, message }) {
    next({ name, message })
  }
})

module.exports = potteryRouter;
