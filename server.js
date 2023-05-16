//require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://tomistoma:Podophyllotoxin1@tomo.brslpu3.mongodb.net/?retryWrites=true&w=majority");
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', ()=> console.log("Connected to database"));
app.use(express.json());


const cors = require('cors');
const corsOptions ={
    origin:['http://localhost:3000',"dev-zbydz5ck.us.auth0.com", 'http://localhost:3001'], 
    credentials:true,
    accessControlAllowCredentials:true,
    optionSuccessStatus:200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}

app.use(cors(corsOptions));
const posts = require('./routes/posts');
app.use('/posts/', posts);
const teachers = require('./routes/teachers');
app.use('/teachers/', teachers);


app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.listen(3001, () => {
console.log("Server is running")
});



