import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRouter from "../../public/routes/users.routes.js";
import authRouter from "../../public/routes/auth.routes.js"

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

// API routes
app.use("/api/users", userRouter);
app.use("/auth", authRouter);

// serve static frontend files
// app.use(express.static(path.join(__dirname, "frontend")));

// main page
app.get("/", (req, res) => {res.redirect("/dashboard.html");});

export default app;