const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians
// GET
app.get("/musicians", async (req, res, next) => {
  try {
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET by ID
app.get("/musicians/:id", async (req, res, next) => {
  try {
    const foundMusician = await Musician.findByPk(req.params.id);
    res.json(foundMusician);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.use(express.json());
app.use(express.urlencoded());

// CREATE
app.post("/musicians", async (req, res, next) => {
  try {
    const newMusician = await Musician.create(req.body);
    res.json(newMusician);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// UPDATE
app.put("/musicians/:id", async (req, res, next) => {
  try {
    const currMusician = await Musician.findByPk(req.params.id);
    const updatedMusician = await currMusician.update(req.body);
    res.json(updatedMusician);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE
app.delete("/musicians/:id", async (req, res, next) => {
  try {
    const currMusician = await Musician.findByPk(req.params.id);
    const deletedMusician = await currMusician.destroy();
    res.json(deletedMusician);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = app;
