import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import {useAppDispatch, useAppSelector} from "../../../Types/hooks";
import {SendMessage, StartMessagesListening, StopMessagesListening} from "../../../redux/chatReducer";
import {ChatMessageType} from "../../../DAL/ChatAPI";

const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(StartMessagesListening())
        return () => {
            dispatch(StopMessagesListening())
        }
    }, [])

    return <div>
        <Messages />
        <AddNewChatMessageForm />
    </div>
}

const Messages: React.FC = () => {
    const messages = useAppSelector((state) => state.chat.messages)

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
    const dispatch = useAppDispatch()

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(SendMessage(message))
        setMessage('')
    }
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>
        <div>
            <Button onClick={sendMessageHandler} disabled={false}>Send
                message</Button>
        </div>
    </div>
}

export default ChatPage