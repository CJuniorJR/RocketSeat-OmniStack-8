const express = require('express');
const mongo = require('mongoose');
const cors = require('cors')

const server = express();

server.user(cors())


const routes = require('./routes');

mongo.connect('mongodb+srv://root:root@cluster0-wv82k.mongodb.net/omnistack8?retryWrites=true&w=majority', { useNewUrlParser: true });



server.use(express.json());
server.use(routes);

server.listen(3333);