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
  const { name, price, stock, environment, size, food, temper, image } = req.body;
  console.log("in api")
  try {
    if (true) { //user is an admin, idk if this is right
      if (!name || !price || !stock || !environment || !size || !food || !temper || !image) { //if data is missing
        next({
          name: "MissingDataError",
          message: "Please provide all info for this creature."
        });

      }
      else {
        // create creature
        console.log("req", req.body)
        const newCreature = await createCreature({ name, price, stock, environment, size, food, temper, image });
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
creaturesRouter.patch('/edit/:creatureid', async (req, res, next) => {
  try {
    // console.log("req1", req.body)
    const { creatureid, name, price, stock, environment, size, food, temper } = req.body;
    if (!name || !price || !stock || !environment || !size || !food || !temper) { //if data is missing
      next({
        name: "MissingDataError",
        message: "Please provide all info for this creature."
      });
    } else {
      // update creature
      // console.log("req2", req.body)
      const editCreature = await updateCreature(creatureid, name, price, stock, environment, size, food, temper );
      res.send(editCreature);
      console.log('update complete')
    }
  } catch ({ name, message }) {
    next({ name, message })
  }
})

// // Delete Creature
creaturesRouter.delete('/:creatureid', async (req, res, next) => {
  try {

    console.log("req params", req.params.creatureid)
    const deletedCreature = await deleteCreature(req.params.creatureid);
    res.send(deletedCreature);
  } catch ({ name, message }) {
    next({ name, message })
  }
})

module.exports = creaturesRouter;
