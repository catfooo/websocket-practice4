const express = require('express') // using express
const socketIO = require('socket.io')
const http = require('http')
// const cors = require('cors')

const port = process.env.PORT || 3001
const app = express()
const server = http.createServer(app) // creating http server using http module in node js and attaching your express application ('app') to it
const io = socketIO(server) // create socket io instance attached to http server ('server')

// // app.use(cors()) // enable cors for all routes
// const corsOptions = {
//     origin: 'http://localhost:5173', // Replace with your client's origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
//   };
  
//   app.use(cors(corsOptions));

// declare the messages array
const messages = []
  
io.on('connection', (socket) => {
    console.log('New user connected')
    // // emit message from server to user
    // socket.emit('newMessage', {
    //     from:'jen@mds',
    //     text:'hepppp',
    //     createdAt:123
    // })

    // emit initial message to the connected user
    socket.emit('newMessage', messages)

    socket.on('createMessage', (newMessage) => {
        console.log('newMessage', newMessage)
        // push newMessage object into messages array
        messages.push(newMessage)
        // emit the updated messages array to all clients
        io.emit('newMessage', messages)

        // send cat to the client to make state update
        cat({ success: true })
    })

     socket.on('disconnect', () => {
        console.log('disconnected from user')
    })

    socket.on('error', (error) => {
        console.error('WebSocket error:', error)
    })
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/my-vite-app/index.html")
})

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
    console.log('Server started')
})


