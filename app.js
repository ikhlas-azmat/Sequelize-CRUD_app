const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./models");
var UserCtrl = require("./controllers/user")
const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.listen(port, ()=>{
    console.log(`app is listening to port ${port}`);
})

app.get('/', (req, res) => {
    res.send("Welcome");
})

app.get('/users', UserCtrl.getUsers);
app.get('/users/:id', UserCtrl.getUserById);

app.post('/users/', UserCtrl.createUser);