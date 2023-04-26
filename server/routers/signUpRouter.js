const express = require("express");
const dB = require("../database/database.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/", (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, function (err, hash) {
    const queryStr = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${hash}');`;
    dB.query(queryStr)
      .then(() => {
        const queryStr = `SELECT * FROM users WHERE email = '${email}';`;
        dB.query(queryStr)
          .then((entry) => {
            console.log(entry);
            res.cookie("name", name);
            res.cookie("id", entry.rows[0].id);
            res.status(200).json({});
          })
          .catch((error) => {
            console.log(error);
            res.status(400).json({ error });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ error });
      });
  });
});

module.exports = router;
