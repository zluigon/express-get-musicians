const express = require("express");
const router = express.Router();
const { Band, Musician } = require("../models/.");

// GET
router.get("/", async (req, res, next) => {
  try {
    const allBands = await Band.findAll({ include: Musician });
    res.json(allBands);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    next(error);
  }
});

// GET /:id
router.get("/:id", async (req, res, next) => {
  try {
    const foundBand = await Band.findByPk(req.params.id, { include: Musician });
    res.json(foundBand);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    next(error);
  }
});

module.exports = router;
