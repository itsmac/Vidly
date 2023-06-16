const {Genre, validate} = require('../models/genres')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.get("/", async (req, res) => {
  const genreList = await Genre.find();
  res.send(genreList);
});

router.post("/", auth, async (req, res) => {
  const error = validate(req);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //console.log(req);
  let newGenre = new Genre({
    name : req.body.name,
  });
  const result = await newGenre.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {

    const error = validate(req);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name : req.body.name}, {new : true})
    
    if (!genre) {
      return res.status(404).send("The id is not found");
    }
    res.send(genre);
});

router.delete("/:id",[auth, admin], async (req, res) => {
  //let genre = genreList.find((gen) => gen.id === parseInt(req.params.id));
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) {
    return res.status(404).send("This id is not found !!");
  }
  //const index = genreList.indexOf(genre);
  //genreList.splice(index, 1);
  res.send(genre);
});

router.get("/:id", async(req, res) => {
  const genre = await Genre.findById(req.params.id);
  if(!genre){
    return res.status(404).send("This id is not found !!");
  }
  res.send(genre)
})

module.exports = router;