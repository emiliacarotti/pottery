const express = require("express");
const creaturesRouter = express.Router();
const { requireUser } = require("./utils");

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {
  getAllCreatures,
  createCreature,
  updateCreature,
  deleteCreature,
  getCreatureById
} = require("../db/creature");


creaturesRouter.use((req, res, next) => {
  console.log(req.body);

  next();
});

// get all creatures
creaturesRouter.get("/", async (req, res, next) => {
  try {
    const allCreatures = await getAllCreatures();
    console.log("all creatures got")
    if (allCreatures) {
      res.send(
        allCreatures
      )
    } else {
      res.send({
        message: "Error getting creatures."
      })
    };
  } catch (error) {
    next(error);
  }
});

// //GET /api/creatures/:creatureid
creaturesRouter.get('/:creatureid', async (req, res, next) => {

  try {
    //console.log(req.params.creatureid)
    const creature = await getCreatureById(req.params.creatureid);
    //console.log(creature)
    res.send(creature);

  } catch (error) {
    console.log("createbyid", error);
    next(error)
  }
})

//working
// create a creature
creaturesRouter.post('/create', async (req, res, next) => {
  const { name, price, stock, environment, size, food, temper } = req.body;
  console.log("in api")
  try {
    if (isAdmin) { //user is an admin, idk if this is right
      if (!name || !price || !stock || !environment || !size || !food || !temper) { //if data is missing
        next({
          name: "MissingDataError",
          message: "Please provide all info for this creature."
        });

      }
      else {
        // create creature
        console.log("req", req.body)
        const newCreature = await createCreature({ name, price, stock, environment, size, food, temper });
        res.send(newCreature);

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
// // Update/Edit Creature  --  HARLEY/EMILIA, CAN YOU LOOK AT THIS?  NOT SURE THAT THIS IS CORRECT.
creaturesRouter.patch('/', async (req, res, next) => {
  try {
    if (true) { //user is an admin, idk if this is right

      const { creatureid, name, price, stock, environment, size, food, temper } = req.body;
      if (!name || !price || !stock || !environment || !size || !food || !temper) { //if data is missing
        next({
          name: "MissingDataError",
          message: "Please provide all info for this creature."
        });

      }
      else {
        // update creature
        const editCreature = await updateCreature({creatureid, name, price, stock, environment, size, food, temper });
        res.send(editCreature);

      }
    }
    else { //user is not an admin 
      next({
        name: 'UnauthorizedUserError',
        message: 'You must be an admin.'
      });

    }

  } catch ({ name, message }) {
    next({ name, message })
  }
})

// // Delete Creature
creaturesRouter.delete('/', async (req, res, next) => {
  try {
    if (true) { //user is an admin, idk if this is right
      //delete creature
      //console.log("req body", req.body.creatureid)
      const deletedCreature = await deleteCreature(req.body.creatureid);
      res.send(deletedCreature);
      // const getCreatures = await getAllCreatures();
      // conole.log(getCreatures);
    } else { //user is not an admin 
      next({
        name: 'UnauthorizedUserError',
        message: 'You must be an admin.'
      })
    }
    } catch ({ name, message }) {
      next({ name, message })
  }
})

module.exports = creaturesRouter;
