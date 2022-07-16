const express = require("express");
const creaturesRouter = express.Router();

const { requireUser } = require("./utils");

const {
  createCreature,
  getAllCreatures,
  updateCreature,
  getCreaturebyCategory,
} = require("../db");

creaturesRouter.get("/", async (req, res, next) => {
  try {
    const allCreatures = await getAllCreatures();

    const creatures = allCreatures.filter((creature) => {
      // the post is active, doesn't matter who it belongs to
      if (post.active) {
        return true;
      }

      // the post is not active, but it belogs to the current user
      if (req.user && post.author.id === req.user.id) {
        return true;
      }

      // none of the above are true
      return false;
    });

    res.send({
      creatures,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});
