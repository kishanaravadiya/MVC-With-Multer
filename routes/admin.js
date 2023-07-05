const express = require('express');

const rotues = express.Router();

const Admincontroller = require('../controllers/Admincontroller');


rotues.get('/',Admincontroller.index);
rotues.post('/insertdata',Admincontroller.insertdata);
rotues.get('/viewdata',Admincontroller.viewdata);
rotues.get('/deletedata',Admincontroller.deletedata);
rotues.get('/editdata/:id',Admincontroller.editdata);
rotues.post('/upadateData',Admincontroller.upadateData);


module.exports = rotues;
