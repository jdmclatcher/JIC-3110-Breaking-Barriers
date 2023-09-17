const express = require('express');
const bodyParser = require('body-parser');
const db = require("./configs/config");
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

console.log(db);

// general app setup
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("."));

app.get('/ping', (req, res) => {
    res.send("pong");
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});

module.exports = app;