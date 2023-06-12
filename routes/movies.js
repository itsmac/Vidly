const {Movies, validate} = require('../models/movies')
const express = require('express');
const { Genre } = require('../models/genres');
const router = express.Router();

router.get("/", async(req, res)=>{
    const movieList = await Movies.find();
    res.send(movieList);
})

router.post("/", async(req, res)=>{
    const error = validate(req);
    if(error) return res.status(400).send("Invalid request " + error.details[0].message);
    const genre = await Genre.findById(req.body.genre);
    // console.log(genre);
    if(!genre) return res.status(400).send("Invalid Genre");

    let newMovie = new Movies({
        title : req.body.title,
        genre : {
            _id : genre._id,
            name : genre.name
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
    });
    const result = await newMovie.save();
    res.send(result);
});



module.exports = router;