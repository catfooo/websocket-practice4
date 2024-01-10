import { useState, useEffect } from "react";
import io from 'socket.io-client'

const App = () => {
    const [messageInput, setMessageInput] = useState('')
    const [messages, setMessages] = useState([])
    const socket = io('http://localhost:3001')

    useEffect(() => {
        // const socket = io('ws://localhost:3001')
        // const socket = io('http://localhost:3001')

        socket.on('connect', () => {
            console.log('connected to server')
        })

        // socket.on('newMessage', (cat) => {
        //     console.log('New message from server:', cat)
        // })
        // listen for new messages from the server
        socket.on('newMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage])
            // console.log('New message from server:', cat)
        })

        // // emits message from user side
        // socket.emit('createMessage', {
        //     to:'john@ds',
        //     text:'what kjkljd'
        // })

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

    const handleInputChange = (event) => {
        setMessageInput(event.target.value)
    }

    const handleSendMessage = () => {
        // emit a message from the user to the server
        socket.emit('createMessage', {
            text: messageInput
        })

        // // clear the input field
        // setMessageInput('')
    }

    return (
        <div>
            {/* <h1>to run socketio</h1> */}
            <div>{messages.map((msg, index) => (
                <div key={index}>{msg.text}</div>
            ))}
            </div>
            <div>
                <input 
                    type="text" 
                    value={messageInput} 
                    onChange={handleInputChange}
                    placeholder="Type your message" 
                />
                <button onClick={handleSendMessage}>send</button>
            </div>
        </div>
    )
}

export default App