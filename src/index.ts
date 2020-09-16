import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import { json } from "body-parser";

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(json());

app.get("/", (req: Request, res: Response) => res.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/member", require("./routes/api/member"));

app.get("*", function(req: Request, res: Response) {
  res.send("This page doesn't exist.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
