const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

const quizRouter = require("./routes/quiz");

// general app setup
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("."));

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}));

app.get('/ping', (req, res) => {
    res.send("pong");
});

// Set up Quiz routes
app.use("/quiz", quizRouter);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});

module.exports = app;
