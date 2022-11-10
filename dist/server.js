import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
var server = express();
server.use(cors());
server.use(express.json());
server.get("/status", function (req, res) {
    res.send("Ok status");
});
server.listen(process.env.PORT, function () {
    console.log("Listening on port: ".concat(process.env.PORT));
});
