const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();

dotenv.config();

router.get("/google", async (req, res, next) => {
  const { code } = req.query;
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(values).toString(),
  })
    .then((response) => response.json())
    .then((data) => {
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${data.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${data.id_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((user) => {
            console.log(user)
          res.cookie("name", user.name);
          res.redirect("http://localhost:8080/#/userpage");
        })
        .catch((error) => {
          console.log(error);
          res.redirect("http://localhost:8080/#/loginerror");
        });
    })
    .catch((error) => {
      console.log(error);
      res.redirect("http://localhost:8080/#/loginerror");
    });
});

module.exports = router;
