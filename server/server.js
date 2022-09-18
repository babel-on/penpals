const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const cors = require('cors');

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
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000' // URL of the react (Frontend) app
}));

app.use('/api', apiRouter);
// app.use('/', express.static(path.join(__dirname, '../client')));

// serve login page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

// forward all request to API router

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




const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

const io = require('socket.io')(3030, {
  cors: {
    origin: '*',
  },
});
require('./socket')(io);

/* 
io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
 */


module.exports = app;
