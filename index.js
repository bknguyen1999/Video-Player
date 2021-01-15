const express = require('express')
var app = express();
const path = require('path')
const PORT = process.env.PORT || 5000
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index'))
http.listen(PORT, () => console.log(`Listening on ${ PORT }`))

io.on('connection', (socket) =>{
  socket.on('playerEvent', (msg) => {
    console.log('message: ' + msg.state);
    console.log('time: ' + msg.time);
    io.emit('playerEvent', msg)
  });
  console.log('a user connected');
  socket.on('connection', (msg)=>{
    io.emit('connection', msg);
  })
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
  socket.on('chat message', (msg) =>{
    io.emit('chat message', msg);
  })
});
 