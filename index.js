require("dotenv").config();

const express = require("express");

const formidable = require("express-formidable");

const app = express();

app.use(formidable());

const cors = require("cors");

app.use(cors());

const mailgun = require("mailgun-js")({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN,
});

app.post("/form", (req, res) => {
  console.log(req.fields);
  const { firstName, lastName, email, subject, message } = req.fields;

  // MAILGUN
  var data = {
    from: `${firstName} ${lastName} <${email}>`,
    to: "olivier.mountou@laposte.net",
    subject: `${subject}`,
    text: `${message}`,
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    console.log(error);
  });

  res.json(`donné reçu email envoyé : ${(firstName, lastName)} `);
});

app.all("*", (req, res) => {
  res.status(400).json("Route does not exists");
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Server starting");
});
