const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();

//Rotas
const index = require('./routes/index');
const botRouter = require('./routes/botRouter');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', index);
app.use('/bot', botRouter);

module.exports = app;