import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import router from "./routes/users.routes.js";

const app = express();

app.use(express.json());  // Use json middleware

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API routes
app.use("/api/users", router);

// serve static frontend files
app.use(express.static(path.join(__dirname, "frontend")));

// main page
app.get("/", (req, res) => {
  res.redirect("/welcome");
});

// start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});