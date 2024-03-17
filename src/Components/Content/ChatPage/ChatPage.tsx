import React, {useEffect, useState} from 'react';
import {Button} from "antd";

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

wsChannel.addEventListener('open', () => {
    console.log('WS is opened')
})

wsChannel.onclose = (e) => {
    console.log('WS is closed')
}

/*wsChannel.addEventListener('message', (e: MessageEvent) => {
    firstPayload = JSON.parse(e.data)
    console.log(firstPayload)
})*/

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {

    return <div>
        <Messages/>
        <AddNewChatMessageForm/>
    </div>
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        console.log('сработал UseEffect на messages')

        wsChannel.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            console.log(newMessages)
            // @ts-ignore
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
            //console.log(messages)
        })

    }, [])

    return <div style={{height: '400px', overflowY: 'auto'}}>
        Messages
        {messages.map((message, index) => <Message key={index} message={message}/>)}
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return <div>
        <img src={message.photo} style={{width: '30px'}}/><b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const AddNewChatMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'ready' | 'pending'>('pending')

    useEffect(() => {
        console.log('сработал UseEffect на open')
        wsChannel.addEventListener('open', () => {
            setReadyStatus('ready' )
        })
    }, [readyStatus])

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel.send(message)
        setMessage('')
    }
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>
        <div>
            <Button onClick={sendMessage} disabled = {readyStatus!=='ready'} >Send message</Button>
            {/*<Button onClick={()=>setReadyStatus('ready')}>Установить enabled для верхней кнопки</Button>*/}
        </div>
    </div>
}

export default ChatPage