const express = require('express');
const path = require('path');

// API router
const apiRouter = require('./routes/apiRouter');

// define port
const PORT = 3000;

// CORS if needed
// const cors = require('cors');
// app.use(cors());

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded());

app.use('/', express.static(path.join(__dirname, '../client')));

// serve login page
app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,'../client/index.html'))
});

// forward all request to API router
app.use('/api', apiRouter);

// catch all unknown routes
app.use('*', (req, res) => {
  res.status(404).json('CANNOT FIND PAGE');
  // res.redirect('/')
});

// global Err handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ Error: err });
});

app.listen(PORT, () => {
  console.log(`Lisening on port ${PORT}...`);
});

module.exports = app;
