const {Genre, GenreSchema} = require('./genres')
const mongoose = require('mongoose');
const Joi = require('joi');


const MovieSchema = new mongoose.Schema({
    title : {
        type : String,
        trim : true,
        maxlength : 255,
        minlength : 1,
        required : true
    },
    genre : {
        type : GenreSchema,
        required : true
    },
    numberInStock : {
        type : Number,
        max : 255,
        min : 0,
        required : true
    },
    dailyRentalRate : {
        type : Number,
        max : 255,
        min : 0,
        required : true
    }
})

const Movies = mongoose.model('Movies', MovieSchema);

function validateMovies(req){
    const schema = Joi.object({
        title : Joi.string().min(1).required(),
        genre : Joi.string().required(),
        numberInStock : Joi.number().min(0).required(),
        dailyRentalRate : Joi.number().min(0).required()
    })

    const {value, error} = schema.validate(req.body);
    return error;
}


exports.Movies = Movies;
exports.validate = validateMovies;

