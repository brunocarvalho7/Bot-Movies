const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();

//Rotas
const index = require('./routes/index');
const botRouter = require('./routes/botRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', index);
app.use('/bot', botRouter);

module.exports = app;