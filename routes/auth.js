const express = require("express");
const router = express.Router();
const {User} = require("../models/users");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async(req, res)=>{
    const error = validate(req);
    if (error) return res.status(400).send("Invalid Email or Password");

    const user = await User.findOne({email : req.body.email});
    if (!user) return res.status(400).send("Invalid Email or Password");
    
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send("Invalid Email or Password");

    const jwtWebToken = user.generateAuthToken();
    return res.send(jwtWebToken);
});

function validate(req) {
    const schema = Joi.object({
        email : Joi.string().min(5).max(255).email(),
        password : Joi.string().min(5).max(255)
    });
    const {value, error} = schema.validate(req.body);
    return error;
}

module.exports = router;