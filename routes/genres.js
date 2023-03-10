const express = require('express');
const router = express.Router();


function isValid(req) {
    const schema = Joi.object({
      genretype: Joi.string().min(3).required(),
    });
  
    const { value, error } = schema.validate(req.body);
    return error;
  }
  
  const genreList = [
    {
      id: 1,
      genretype: "action",
    },
    {
      id: 2,
      genretype: "thriller",
    },
  ];
  

  
  router.get("/", (req, res) => {
    res.send(genreList);
  });
  
  router.post("/", (req, res) => {
    const error = isValid(req);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let newGenre = {
      id: genreList.length + 1,
      genretype: req.body.genretype,
    };
    genreList.push(newGenre);
    res.send(newGenre);
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