var mysql = require("mysql");
const express = require("express");
var cors = require("cors");
var fs = require("fs");

const bodyParser = require("body-parser");
const app = express();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "akash",
  database: "nodedb",
});

app.use(cors());
const tbl = "products";
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
var corsOptions = {
  origin: "*",
  methods: "GET",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Connect with MySql
con.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected");
});

// Create Database
// connection.query("Create Database wsddb", function (err, result) {
//     if (err) throw err;
//     console.log("Result: " + result);
// });

// routes
app.get("/", (req, res) => {
  // Display all data
  res.status(200);
  res.setHeader("Content-Type", "application/json");
  con.query("SELECT * from " + tbl, function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
    res.end(JSON.stringify(result));
  });
});

app.post("/new", (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", "application/json");
  // console.log(req.body)
  var resp = req.body;
  console.log(resp["fid"]);
  con.query(
    "INSERT into " +
      tbl +
      " VALUES (" +
      resp["product_id"] +
      ",'" +
      resp["product_name"] +
      "'," +
      resp["product_price"] +
      ",'" +
      resp["product_cat"] +
      "')",
    function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));
      res.end(JSON.stringify(result));
    }
  );
});

app.post("/update", (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", "application/json");
  // console.log(req.body)
  var resp = req.body;
  console.log(resp);
  con.query(
    "UPDATE " +
      tbl +
      " SET product_name= '" +
      resp["product_name"] +
      "',product_price=" +
      resp["product_price"] +
      ",product_cat= '" +
      resp["product_cat"] +
      "' where product_id = " +
      resp["product_id"],
    function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));
      res.end(JSON.stringify(result));
    }
  );
});

app.post("/search", (req, res) => {
  // Display all data
  res.status(200);
  res.setHeader("Content-Type", "application/json");
  var sid = req.body["searchid"];
  con.query(
    "SELECT * from " + tbl + " where product_id = '" + sid + "'",
    function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));
      res.end(JSON.stringify(result));
    }
  );
});

app.post("/delete", (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", "application/json");
  var delId = req.body["delID"];

  con.query(
    "DELETE from " + tbl + " where product_id = " + delId,
    function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));
      res.end(JSON.stringify(result));
    }
  );
});

app.get("/*", (req, res) => {
  res.status(404);
  res.end("<h1>404 Error</h1>");
});

// Http connection
app.listen(3001, "localhost", () => {
  console.log(`App listening at http://localhost:3001`);
});
