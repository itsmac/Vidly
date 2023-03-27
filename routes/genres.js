const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi')

function isValid(req) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { value, error } = schema.validate(req.body);
  return error;
}

//creating Schema (to define the shape of the document)
const GenreSchema = new mongoose.Schema({
  name: { 
    type: String,
    maxlength: 10,
    minlenght: 3, 
    required: true },

});

//Creating the model
const Genre = mongoose.model('Genre', GenreSchema); 

// const genreList = [
//   {
//     id: 1,
//     genretype: "action",
//   },
//   {
//     id: 2,
//     genretype: "thriller",
//   },
// ];



router.get("/", async (req, res) => {
  const genreList = await Genre.find();
  res.send(genreList);
});

router.post("/", async (req, res) => {
  const error = isValid(req);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  console.log(req);
  let newGenre = new Genre({
    name : req.body.name,
  });
  const result = await newGenre.save();
  res.send(result);
});

router.put("/:id", (req, res) => {
  let genre = genreList.find((gen) => gen.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("The is not found");
  } else {
    const error = isValid(req);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    genre.genretype = req.body.genretype;
    res.send(genre);
  }
});

router.delete("/:id", (req, res) => {
  let genre = genreList.find((gen) => gen.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("This id is not found !!");
  }
  const index = genreList.indexOf(genre);
  genreList.splice(index, 1);
  res.send(genre);
});

module.exports = router;