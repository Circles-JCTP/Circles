const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("in logout")
  res.cookie("name", null);
  res.status(200).send({});
});

module.exports = router;
