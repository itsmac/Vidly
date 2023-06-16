const auth = require("../middleware/auth")
const express = require("express");
const router = express.Router();
const {User, validate} = require("../models/users")
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.get("/me", auth, async(req, res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password');
    return res.send(user);
});

router.post("/", async(req, res)=>{
    const error = validate(req);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email : req.body.email});
    if(user) return res.status(400).send("User already registered...");
    
    user = new User(_.pick(req.body,['name', 'email', 'password'] ));

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-header', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;