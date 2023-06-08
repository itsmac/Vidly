const mongoose = require("mongoose");
const Joi = require("joi");


//creating Schema (to define the shape of the document)
const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 10,
        minlenght: 3,
        required: true
    },

});

//Creating the model
const Genre = mongoose.model('Genre', GenreSchema);


function isValid(req) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    const { value, error } = schema.validate(req.body);
    return error;
}

exports.Genre = Genre;
exports.GenreSchema = GenreSchema;
exports.validate = isValid;