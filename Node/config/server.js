'use strict'

const express = require('express');
const server =express();

const bodyParser = require('body-parser');
const consign = require('consign');
const cors = require('cors');

server.use('/vjobs', express.static(__dirname  + '/../app/static'))
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(cors({origin: '*'}));

consign()
    .include('./config/firebaseConfig.js')
    .then('./app/routes')
    .into(server)

server.get('/', async(req, res) => {
    return res.redirect('http://localhost:3000/vjobs/index.html');
});

module.exports = server;