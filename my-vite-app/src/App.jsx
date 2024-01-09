import { useEffect } from "react";
import io from 'socket.io-client'

const App = () => {
    useEffect(() => {
        // const socket = io('ws://localhost:3001')
        const socket = io('http://localhost:3001')

        socket.on('connect', () => {
            console.log('connected to server')
        })

        socket.on('newMessage', (cat) => {
            console.log('New message from server:', cat)
        })

        // emits message from user side
        socket.emit('createMessage', {
            to:'john@ds',
            text:'what kjkljd'
        })

        socket.on('disconnect', () => {
            console.log('Disconnect from server')
        })

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