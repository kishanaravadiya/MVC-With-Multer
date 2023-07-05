const express = require('express');

const rotues = express.Router();

console.log("Rotues is Working");

rotues.use('/admin',require('./admin'));

module.exports = rotues;
