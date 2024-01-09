import { useEffect } from "react";
import io from 'socket.io-client'

const App = () => {
    useEffect(() => {
        // const socket = new WebSocket('ws://localhost:3000')
        // const socket = new WebSocket('ws://localhost:3001')
        // const socket = io('ws://localhost:3001')
        const socket = io('http://localhost:3001')

        // socket.addEventListener('open', (event) => {
        //     console.log('WebSocket connection opened')
        //     socket.send('Hello, server!')
        // })
        socket.on('connect', () => {
            // console.log('Socket.IO connection opened')
            console.log('connected to server')
            // socket.emit('message', 'Hello, server!')
            // socket.emit('createMessage', 'Hello, server!')
        })

        // socket.addEventListener('message', (event) => {
        //     console.log(`Received message from server: ${event.data}`)
        // })
        // socket.on('message', (data) => {
        //     console.log(`Received message from server: ${data}`)
        // })
        // (cat) is placeholder for received data, so you can use whatever you want. message, data,...
        // message listener from server
        socket.on('newMessage', (cat) => {
            console.log('New message from server:', cat)
        })

        // emits message from user side
        socket.emit('createMessage', {
            to:'john@ds',
            text:'what kjkljd'
        })

        // socket.addEventListener('close', (event) => {
        //     console.log('WebSocket connection closed')
        // })
        // when disconnected from server
        socket.on('disconnect', () => {
            // console.log('Socket.IO connection closed')
            console.log('Disconnect from server')
        })

        // socket.addEventListener('error', (event) => {
        //     console.error('WebSocket error:', event)
        // })
        socket.on('error', (error) => {
            console.error('Socket.IO error:', error)
        })

        // clean up connection when component unmounts
        return () => {
            socket.close()
        }
    }, []) // empty dependency array to make sure the effect runs only once on mount

    return (
        <div>
            <h1>to run socketio</h1>
        </div>
    )
}

export default App