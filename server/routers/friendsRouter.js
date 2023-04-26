const express = require("express");
const dB = require("../database/database.js");

const router = express.Router();

router.get("/getlist", (req, res, next) => {
  const { name } = req.query;
  const { id } = req.cookies;
  console.log(name, "in get list");
  const queryStr = `SELECT * FROM friends f JOIN users u ON f.friend_id = u.id WHERE f.user_id = ${id};`;
  dB.query(queryStr)
    .then((friends) => {
      res.status(200).json(friends.rows);
    })
    .catch((error) => {
      console.log(error);
      return next({
        log: "Express error handler caught getfriendslist middleware error",
        status: 400,
        message: { err: error },
      });
    });
});

router.get("/add", (req, res, next) => {
  const { friendsemail, id } = req.query;
  const queryStr = `SELECT * from USERS u WHERE u.email = '${friendsemail}';`;
  dB.query(queryStr)
    .then((result) => {
      if (result.rows[0]) {
        const queryStr = `INSERT INTO friends (user_id, friend_id) VALUES (${id}, ${result.rows[0].id});`;
        dB.query(queryStr)
          .then((results) => {
            console.log(results.rows);
            res.status(200).json();
          })
          .catch((error) => {
            console.log(error);
            return next({
              log: "Express error handler caught addfriend middleware error",
              status: 400,
              message: { err: error },
            });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      return next({
        log: "Express error handler caught addfriend middleware error",
        status: 400,
        message: { err: error },
      });
    });
});

module.exports = router;
