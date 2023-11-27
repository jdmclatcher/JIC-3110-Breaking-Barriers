const express = require("express");
const cors = require("cors");
const sessions = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

const quizRouter = require("./routes/quiz");
const fileRouter = require("./routes/file");
const accountRouter = require("./routes/account");
const courseRouter = require("./routes/course");
const moduleRouter = require("./routes/module");

// general app setup
app.use(
  sessions({
    secret: "waste secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
    resave: true,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("."));

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.get("/ping", (req, res) => {
  res.send("pong");
});

// Set up Quiz routes
app.use("/quiz", quizRouter);
app.use("/file", fileRouter);
app.use("/account", accountRouter);
app.use("/course", courseRouter);
app.use("/module", moduleRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});

module.exports = app;
