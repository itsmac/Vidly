const express = require("express");
const Joi = require("joi");
const app = express();
const genres = require("./routes/genres");
const defaultPage = require("./routes/default");
const { default: mongoose } = require("mongoose");
const PORT = 4000;

app.use(express.json()); //didn't work well with current code need to check other middlewares

mongoose.connect('mongodb://127.0.0.1/vidly')
        .then(()=> console.log("Connection successul"))
        .catch( err => console.log("Connection failed "+ err));



app.use('/api/v1/genres', genres);
app.use('/',defaultPage);

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
