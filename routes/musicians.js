const express = require("express");
const router = express.Router();
const { Musician } = require("../models/.");

//TODO: Create a GET /musicians route to return all musicians
// GET
router.get("/", async (req, res, next) => {
  try {
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    next(error);
  }
});

// GET by ID
router.get("/:id", async (req, res, next) => {
  try {
    const foundMusician = await Musician.findByPk(req.params.id);
    res.json(foundMusician);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    next(error);
  }
});

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const newMusician = await Musician.create(req.body);
    res.json(newMusician);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    next(error);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const currMusician = await Musician.findByPk(req.params.id);
    const updatedMusician = await currMusician.update(req.body);
    res.json(updatedMusician);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    next(error);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const currMusician = await Musician.findByPk(req.params.id);
    const deletedMusician = await currMusician.destroy();
    res.json(deletedMusician);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    next(error);
  }
});

module.exports = router;
