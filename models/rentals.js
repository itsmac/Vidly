const express = require("express");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { default: mongoose } = require("mongoose");

const RentalSchema = new mongoose.Schema(
    {
        customer: {
            type: new mongoose.Schema({
                name: {
                    type: String,
                    minlength: 5,
                    maxlenght: 50,
                    required: true
                },
                isGold: {
                    type: Boolean,
                    default: false
                },
                phone: {
                    type: String,
                    minlength: 5,
                    maxlenght: 50,
                    required: true
                }
            }),
            required: true
        },
        movie: {
            type: new mongoose.Schema({
                title: {
                    type: String,
                    trim: true,
                    maxlength: 255,
                    minlength: 1,
                    required: true
                },
                dailyRentalRate: {
                    type: Number,
                    max: 255,
                    min: 0,
                    required: true
                }
            }),
            required: true
        },
        dateOut :{
            type : Date,
            required : true,
            default : Date.now()
        },
        dateReturned :{
            type : Date
        },
        rentalFee : {
            type : Number,
            min : 0
        }
    }
);

const Rental = mongoose.model('Rental', RentalSchema);

function validateRentals(req){
    const schema = Joi.object({
        customerId : Joi.objectId().required(),
        movieId : Joi.objectId().required()
    });
    const {value, error} = schema.validate(req.body);
    return error;
}

exports.Rentals = Rental;
exports.validate = validateRentals;