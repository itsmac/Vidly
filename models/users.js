const express = require("express");
const { default: mongoose } = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255
    },
    email :{
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255
    }
})

const User = mongoose.model("user", UserSchema );

function validateUsers(req){
    const schema = Joi.object({
        name : Joi.string().min(5).max(255).required(),
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(255).required()
    });

    const {value, error} = schema.validate(req.body);
    return error;
}

exports.User = User;
exports.validate = validateUsers;