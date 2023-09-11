const express = require('express');
const bodyParser = require('body-parser');
const port = 3001;
require('dotenv').config();
const app = express();

// general app setup
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("."));

app.get('/ping', (req, res) => {
    res.send("pong");
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

module.exports = app;