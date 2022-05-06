const express = require("express");
const mysql = require("mysql2");
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

app.get("/getuser/:id", (req, res) => {
  try {
    db.query(
      `SELECT * FROM USERS WHERE id = ${req.params.id}`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.status(201).send(result);
        console.log(result);
      }
    );
  } catch (e) {
    console.log(e);
  }
});

app.put("/updateuser/:id", (req, res) => {
  const { name, country } = req.body;
  try {
    db.query(
      ` UPDATE USERS SET name= '${name}', country= '${country}' WHERE id = ${req.params.id}`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.status(201).send(result);
      }
    );
  } catch (e) {
    console.log(e);
  }
});

app.listen(3001, () => {
  console.log("server running at 3001");
});
