const express = require("express");
const dB = require("../database/database.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/", (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, function (err, hash) {
    const queryStr = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${hash}');`;
    dB.query(queryStr)
      .then((result) => {
        console.log(result);
        res.status(200).json({ name });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ error });
      });
  });
});

module.exports = router;
