const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

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
