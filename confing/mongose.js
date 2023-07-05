const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/avatar');

const db = mongoose.connection;

db.on('error',console.error.bind(console,('DB Is Not Start')));

db.once('open',(err)=>{
    if(err){
        console.log("DB Is Not Founds");
        return false;
    }
    console.log("DB Successfully Connection");
});

module.exports = db;