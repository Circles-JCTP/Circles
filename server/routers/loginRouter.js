const express = require("express");
const dB = require("../database/database.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  const queryStr = `SELECT * FROM users WHERE email = '${email}';`;
  dB.query(queryStr).then((userInDB) => {
    if (userInDB.rows.length) {
      bcrypt.compare(password, userInDB.rows[0].password).then((comparison) => {
        if (comparison) {
          console.log("user authenticated");
          res.cookie("name", userInDB.rows[0].name);
          res.cookie("id", userInDB.rows[0].id);
          res.status(200).json({ userInDB });
        } else {
          console.log("false credentials");
          const error = "invalid password";
          return next({
            log: "Express error handler caught login middleware error",
            status: 400,
            message: { error },
          });
        }
      });
    } else {
      console.log("false credentials");
      const error = "user doesnt exist with this email";
      return next({
        log: "Express error handler caught login middleware error",
        status: 400,
        message: { error },
      });
    }
  });
});

module.exports = router;
