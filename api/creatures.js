const express = require("express");
var app = express()

const creaturesRouter = express.Router();

const { requireUser } = require("./utils");

const {
  getAllCreatures,
  createCreature,
  // updateCreature,
  // getCreaturebyCategory,
} = require("../db");

// get all creatures
creaturesRouter.get("/", async (req, res, next) => {
  try {
    const allCreatures = await getAllCreatures();

    if (allCreatures) {
      res.send({
        allCreatures
      })
    }else{
      res.send({
        message: "Error getting creatures."
      })
    };
  } catch (error) {
    next(error);
  }
});


// create a creature
creaturesRouter.post('/', async (req, res, next) => {
  try {
    if(req.user.admin){ //user is an admin, idk if this is right

      const { creatorid, name, descriptionid, price, stock } = req.body;
      if (!creatorid || !name || !descriptionid || !price || !stock) { //if data is missing
        next({
          name: "MissingDataError",
          message: "Please provide all info for this creature."
        });

      }
      else {
        // creatue creature
        const newCreature = await createCreature({ creatorid, name, descriptionid, price, stock });
        res.send({newCreature});

      }
    }
    else{ //user is not an admin 
      next({
        name: 'NoUserError',
        message: 'You must be an admin.'
      });

    }
    
  } catch (error) {
    next(error)
  }
})

module.exports = creaturesRouter;

