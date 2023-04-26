const express = require('express');
const multer = require("multer");
const dotenv = require("dotenv");
const loginRouter = require("./routers/loginRouter");
const oAuthRouter = require("./routers/oAuthRouter");
const signUpRouter = require("./routers/signUpRouter");
const logoutRouter = require("./routers/logoutRouter");
const friendsRouter = require("./routers/friendsRouter");
const cookieParser = require("cookie-parser");
const app = express();
const upload = multer();
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

app.use(cookieParser());
app.use(express.json());
app.use(upload.array());
dotenv.config();

app.use("/login", loginRouter);
app.use("/login/oauth", oAuthRouter);
app.use("/signup", signUpRouter);
app.use("/logout", logoutRouter);
app.use("/friends", friendsRouter);

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
