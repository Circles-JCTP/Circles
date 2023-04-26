const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
const loginRouter = require("./routers/loginRouter");
const oAuthRouter = require("./routers/oAuthRouter");
const signUpRouter = require("./routers/signUpRouter");
const logoutRouter = require("./routers/logoutRouter");
const friendsRouter = require("./routers/friendsRouter");
const cookieParser = require("cookie-parser");

const app = express();
const upload = multer();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(upload.array());
dotenv.config();

app.use("/login", loginRouter);
app.use("/login/oauth", oAuthRouter);
app.use("/signup", signUpRouter);
app.use("/logout", logoutRouter);
app.use("/friends", friendsRouter);

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
