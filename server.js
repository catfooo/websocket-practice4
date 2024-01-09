const express = require('express') // using express
const socketIO = require('socket.io')
const http = require('http')
const cors = require('cors')

const port = process.env.PORT || 3001
const app = express()
const server = http.createServer(app) // creating http server using http module in node js and attaching your express application ('app') to it
const io = socketIO(server) // create socket io instance attached to http server ('server')

// // allow all origins for socket io
// io.origins('*:*')
// app.use(cors()) // enable cors for all routes
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your client's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));
  

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/my-vite-app/index.html")
// })

// // server.listen(port)
// server.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`)
//     console.log('Server started')
// })

// not sure that i need this, but got this from chatgpt
// // Serve the Socket.IO library on the same path as the server
// app.get("/socket.io/socket.io.js", (req, res) => {
//     res.sendFile(__dirname + "/node_modules/socket.io-client/dist/socket.io.js");
//   });

// socket io logic, connection handling, etc.
io.on('connection', (socket) => {
    // console.log('Client connected')
    console.log('New user connected')
    // emit message from server to user
    socket.emit('newMessage', {
        from:'jen@mds',
        text:'hepppp',
        createdAt:123
    })

    // // send a msg to the client when connected
    // socket.send('hello client')

    // // handel socket event (message from client)
    // socket.on('message', (message) => {
    //     console.log(`Received message: ${message}`)
    //      // echo the msg back to the client
    //      socket.send(`You said: ${message}`)
    // })
    // // handel socket event (message from client)
    // listener when server emit any message
    // listen for message from user
    socket.on('createMessage', (newMessage) => {
        console.log('newMessage', newMessage)
        //  // echo the msg back to the client
        //  socket.send(`You said: ${message}`)
    })

     // handle socket connection closing
     // In Socket.IO, the event for handling client disconnection is disconnect, not close. 
     // when server disconnects from user
     socket.on('disconnect', () => {
        // console.log('Client disconnected')
        console.log('disconnected from user')
    })

    // err event listener
    socket.on('error', (error) => {
        console.error('WebSocket error:', error)
    })
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/my-vite-app/index.html")
})

// server.listen(port)
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
    console.log('Server started')
})


