const dotenv = require("dotenv");
dotenv.config();

const setRandomStatus = require("./setRandomStatus.js");
const express = require("express");
const cors = require("cors");
const requestPassword = process.env.REQUEST_PASSWORD;

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
    if (req.query.password !== requestPassword) {
        res.statusCode = 400;
        res.send();
        return;
    }

    try {
        let statusMessage = await setRandomStatus();

        res.statusCode = 200;
        res.send(statusMessage);
    } catch (e) {
        res.statusCode = 500;
        res.send();
    }    
});

app.listen(5000);