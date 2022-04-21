const express = require('express')
var cors = require('cors')
const app = express()
const port = 6969
const fs = require('fs');
const path = require('path');
app.use(express.json());

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


let rawData = fs.readFileSync(path.resolve(__dirname, 'todo.json'));
let todoList = JSON.parse(rawData);

app.use(cors({
  origin: 'http://127.0.0.1:5500'
}
))


app.get('/', (req, res) => {
  results = con.query("SELECT * FROM `tasks`", function (err, result) {
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(result);
  });
});

app.post('/', (req, res) => {
  var insert = "INSERT INTO `tasks`(`task`, `status`) VALUES (?,0)"
  var taskname = req.body.name
  con.query(insert, taskname, function (err, result) {
    if (err) throw err;
    console.log("Data inserted");
    res.status(200).send("ok")
  });
});

app.delete('/hard', (req, res) => {
  var deleteSql = "DELETE FROM `tasks` WHERE task=?"
  var taskNamed = req.body.name
  con.query(deleteSql, taskNamed, function (err, result) {
    if (err) throw err;
    console.log("Data Deleted");
    res.status(200).send("ok")
  });
});



app.put('/', async (req, res) => {
  const dataName = req.body.newName
  if (req.body.status == true)
    dataStatus = 1
  else
    dataStatus = 0
  const oldName = req.body.oldName
  var editSql = "UPDATE `tasks` SET `task`='" + dataName + "',`status`='" + dataStatus + "' WHERE `task`='" + oldName + "'"
  con.query(editSql, function (err, result) {
    if (err) throw err;
    console.log("Data Updated");
    res.status(200).send("ok")
  })
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})