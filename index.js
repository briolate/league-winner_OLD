"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = require("./config/db");
var body_parser_1 = require("body-parser");
var app = express_1.default();
// Connect Database
db_1.connectDB();
// Init Middleware
app.use(body_parser_1.json());
app.get("/", function (req, res) { return res.send("API Running"); });
// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/member", require("./routes/api/member"));
app.get("*", function (req, res) {
    res.send("This page doesn't exist.");
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log("Server started on port " + PORT); });
