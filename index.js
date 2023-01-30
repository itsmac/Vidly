const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

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
    let newGenre = {
        id : genreList.length + 1,
        genretype : req.body.genretype
    }
    genreList.push(newGenre);
    res.send(newGenre);
});

app.put("/api/v1/genres/:id",(req,res) => {
    let genre = genreList.find(gen => gen.id === parseInt(req.params.id));
    if(!genre){
        return res.status(404).send("The is not found");
    }
    else{
        genre.genretype = req.body.genretype;
        res.send(genre);
    }

});

app.delete("/api/v1/genres/:id", (req,res) => {
    let genre = genreList.find(gen => gen.id === parseInt(req.params.id))
    if(!genre){
        return res.status(404).send("This id is not found !!");
    }
    const index = genreList.indexOf(genre);
    genreList.splice(index,1);
    res.send(genre);
});



app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
