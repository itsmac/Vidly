const Joi = require("joi");
const mongoose = require("mongoose");

//TODO : restructure this as required.
const customerSchema = new mongoose.Schema({
    name : String,
    phone : String,
    isGold : Boolean
});
const Customer = mongoose.model("customer", customerSchema);

function isValid(req){
    requestSchema = Joi.object({
        name : Joi.string(),
        phone : Joi.string().min(5),
        isGold : Joi.boolean()
    })
    console.log(requestSchema.validate(req.body));
    const {value, error} = requestSchema.validate(req.body);
    return error;
}

exports.Customer = Customer;
exports.validate = isValid;