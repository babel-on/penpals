const express = require('express');
const path = require('path');

// API router
const apiRouter = require('./routes/apiRouter');

// define port
const PORT = 3000;

const app = express();

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded());

app.use('/', express.static(path.join(__dirname, '../client')));

// serve login page
app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
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
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: 'An error occurred'},
  };
  const errorObj = Object.assign({}, defaultError, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;

