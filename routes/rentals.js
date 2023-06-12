const mongoose = require("mongoose");
const { Customer } = require("../models/customers");
const { Movies } = require("../models/movies");
const {Rentals, validate} = require("../models/rentals");
const express = require("express");
const router = express.Router();
// const Fawn = require("fawn");


// mongoose.connect('mongodb://127.0.0.1/vidly')
// Fawn.init(mongoose);

router.get("/", async(req,res)=>{
    const rentalList = await Rentals.find();
    res.send(rentalList);
})

router.post("/", async(req,res)=>{
    const error = validate(req);
    if (error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid Customer");

    const movie = await Movies.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Invalid Movie");

    let rental = new Rentals({
        customer : {
            _id : customer._id,
            name : customer.name,
            phone : customer.phone
        },
        movie : {
            _id : movie._id,
            title : movie.title,
            dailyRentalRate : movie.dailyRentalRate
        }

    });
    
        rental = await rental.save();
        movie.numberInStock -= 1;
        movie.save();
//Commenting the Fawn due to the issues with mongoose version > 6
    // try{
    //     new Fawn.Task()
    //             .save("rentals", rental)
    //             .update("movies", {_id : movie._id}, {
    //                 $inc : {numberInStock : -1}
    //             })
    //             .run();
    //     res.send(rental);
    // }
    // catch(ex){
    //     res.status(500).send("Something Failed");
    // }
})

module.exports = router;