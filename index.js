const express = require('express');

const port = 9856;
const app = express();

const path = require('path');

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

const db = require('./confing/mongose');

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log("Server Is Not Start");
        return false;
    }
    console.log("Server Is Successfully Start :- "+port);
})
