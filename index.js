const express = require("express");
const Joi = require("joi");
const app = express();
const PORT = 4000;

app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("Hellowwww Worldddd !!!!");
});

app.get("/api/v1/genres", (req, res) => {
  res.send(genreList);
});

app.post("/api/v1/genres", (req, res) => {
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

app.put("/api/v1/genres/:id", (req, res) => {
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

app.delete("/api/v1/genres/:id", (req, res) => {
  let genre = genreList.find((gen) => gen.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("This id is not found !!");
  }
  const index = genreList.indexOf(genre);
  genreList.splice(index, 1);
  res.send(genre);
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
