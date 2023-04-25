const {Customer, validate} = require("../models/customers")
const express = require("express");
const router = express.Router();



router.get("/", async(req, res)=>{
    const customerList = await Customer.find();
    console.log(customerList.length);
    res.send(customerList);
});

router.post("/", async (req, res) => {
    const err = validate(req);
    if (err) {
        return res.status(400).send(err.details[0].message);
    }
    let newCustomer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    const result = await newCustomer.save()
    res.send(result);
    return;
});

router.put("/:id", async (req, res) => {
    const err = validate(req);
    if (err) {
        return res.status(400).send(err.details[0].message);
    }

    const result = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true });
    res.send(result);
});


router.delete("/:id", async(req, res)=>{    
    const result = await Customer.findByIdAndRemove(req.params.id);
    if(!result){
        return res.status(404).send("This id is not found");
    }
    res.send(result);

})

router.get("/:id", async(req, res)=>{
    const customer = Customer.findById(req.params.id);
    if(!customer){
        return res.status(404).send("This id is not found");
    }
    res.send(customer);
});


module.exports = router;