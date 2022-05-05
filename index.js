const express = require("express");
const mysql = require("mysql");
const { hostname } = require("os");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "testnode",
});

app.get("/", (req, res) => {
  db.query("SELECT * FROM USERS", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/adduser", (req, res) => {
  const { name, country } = req.body;
  try {
    if (name && country) {
      db.query(
        ` INSERT INTO USERS(name, country) VALUES('${name}', '${country}')`
      );
      res.status(201).send({ msg: "user created." });
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(3001, () => {
  console.log("server running at 3001");
});
