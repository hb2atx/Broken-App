const express = require('express');
const app = express();
const handleRequest = require('./handleRequest') 
const morgan = require('morgan') 

app.use(morgan('dev'))
app.use(express.json());
app.use('/', handleRequest);
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).send('Internal Server Error');
})

app.listen(3000, function() {
  console.log('App running on port 3000');
});

module.exports = app;