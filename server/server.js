const express = require("express");
const dB = require("./database/database.js");
const multer = require("multer");

const app = express();
const upload = multer();
const PORT = 3000;

app.use(express.json());
app.use(upload.array());

app.get("/test", (req, res, next) => {
  console.log(dB);
});

app.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  console.log('email', email, 'pass', password);
});

//GLOBAL ERROR HANDLING
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//STARTING THE BACKEND SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
