const express = require('express')
var cors = require('cors')
const app = express()
const port = 6969
<<<<<<< Updated upstream
const fs = require('fs');
const path = require('path');
app.use(express.json());

let rawData = fs.readFileSync(path.resolve(__dirname, 'todo.json'));
let todoList = JSON.parse(rawData);
=======
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://root123:root@cluster0.ycexq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri);

show ()
async function show(){
  try{
  await client.connect();
  await listDatabases(client)
  } catch(e){
      console.error(e)
  }  finally{
    await client.close()
  }
  }
async function create(data){
  try{
  await client.connect();
  await createListing(client,data)
  } catch(e){
      console.error(e)
  }  finally{
    await client.close()
  }
  }
  
  async function remove(data,stat){
    try{
    await client.connect();
    await deleteListing(client,data,stat)
    } catch(e){
        console.error(e)
    }  finally{
      await client.close()
    }
    }


async function listDatabases(client) {
  const databasesList = await client.db("Tasks").collection("Todo").find({})
  console.log(databasesList)
}


async function createListing (client, newListing) {
const result = await client.db("Tasks").collection ("Todo").insertOne(newListing);
console.log(`New listing created with the following id: ${result.insertedId}`);}

async function deleteListing (client,listingName,value){
  const result =await client.db("Tasks").collection ("Todo").deleteOne({listingName : value})
  console.log(`${result.deletedCount} document was deleted`)
}

app.use(express.json());

>>>>>>> Stashed changes

app.use(cors({
    origin: 'http://127.0.0.1:5500'}
))
  

app.get('/', (req, res) => {
<<<<<<< Updated upstream
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
=======
  results = show()
  console.log("sd",results)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(results);
  });


app.post('/', (req, res) => {
    var taskName = req.body.name
    create({[taskName] : false})
    console.log("Data inserted");
    res.status(200).send("ok")
  });

app.delete('/hard', (req, res) => {
  var taskNamed = req.body.name
  if (req.body.name=="done")
    taskStat = true
    else
    taskStat = false
  remove(client,  {taskNamed:taskStat})
    console.log("Data Deleted");
    res.status(200).send("ok")
  });


>>>>>>> Stashed changes

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