const express = require('express');
const app = express();
const PORT = 3000;
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: { origin: '*' },
  methods: ['GET', 'POST'],
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is runnign');
});

io.on('connection', (socket) => {
  socket.emit('me', socket.id);
  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });
  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

//GLOBAL ERROR HANDLING
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//STARTING THE BACKEND SERVER
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
