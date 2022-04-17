const express = require('express')
var cors = require('cors')
const app = express()
const port = 6969
const fs = require('fs');
const path = require('path');
app.use(express.json());

let rawData = fs.readFileSync(path.resolve(__dirname, 'todo.json'));
let todoList = JSON.parse(rawData);

app.use(cors({
    origin: 'http://127.0.0.1:5500'}
))
  

app.get('/', (req, res) => {
    res.send(todoList);
})

app.post('/', (req, res) => {
    newName = req.body.name 
    const newData = {
        [newName]:"false"
    };
    const task = {
        ...todoList,
        ...newData
    }
    let data = JSON.stringify(task);
    fs.writeFile('todo.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    res.status(200).send("ok")
})

app.delete('/hard', (req, res) => {
    delete todoList[req.body.name];
    let data = JSON.stringify(todoList);
    fs.writeFile('todo.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    res.status(200).send("ok")
})

app.delete('/soft', (req, res) => {
    todoList[req.body.name]=false;
    let data = JSON.stringify(todoList);
    fs.writeFile('todo.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    res.status(200).send("ok")
})

app.put('/', async(req, res) => {
    const dataName = req.body.newName
    const newData = {
        [dataName]:req.body.status
    };
    delete todoList[req.body.oldName]; 
    const task = {
        ...todoList,
        ...newData
    }
    let data = JSON.stringify(task);
    fs.writeFile("todo.json", data, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("todo.json", "utf8"));
          res.send(todoList);
        }
      });

    })


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})