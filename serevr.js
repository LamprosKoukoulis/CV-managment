import app from "./private/src/app.js";

const PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});