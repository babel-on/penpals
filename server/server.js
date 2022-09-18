const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

// API router
const apiRouter = require('./routes/apiRouter');
const convoRouter = require('./routes/conversationRouter');
// define port
const PORT = 3000;

const app = express();
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI).then(() => console.log('Connected to MongoDB'));

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);
// app.use('/', express.static(path.join(__dirname, '../client')));

// serve login page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

// forward all request to API router
const cors = require('cors');
app.use(cors());
// catch all unknown routes
app.use('*', (req, res) => {
  res.status(404).json('CANNOT FIND PAGE');
  // res.redirect('/')
});

// global Err handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Unknown error occurred',
    status: 500,
    message: 'An error occurred',
  };
  const error = Object.assign(defaultError, err);
  if (error.log) console.log(error.log);
  res.status(error.status).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
