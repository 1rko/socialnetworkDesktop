import React, {useEffect, useRef, useState} from 'react';
import {Button} from "antd";
import {useAppDispatch, useAppSelector} from "../../../Types/hooks";
import {SendMessage, StartMessagesListening, StopMessagesListening, actions} from "../../../redux/chatReducer";
import {ChatMessageAPIType} from "../../../DAL/ChatAPI";

const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {
    const status = useAppSelector(state => state.chat.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(actions.cleanMessagesInSTate())
        dispatch(StartMessagesListening())
        return () => {
            dispatch(StopMessagesListening())
        }
    }, [])

    return <div>
        {(status === 'error') && <div>Some error, refresh the page</div>}
        <>
            <Messages/>
            <AddNewChatMessageForm/>
        </>
    </div>
}

const Messages: React.FC = () => {
    const messages = useAppSelector((state) => state.chat.messages)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const messageAnchorRef = useRef<HTMLDivElement>(null)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {      //Если scroll - до конца вниз, то включаем isAutoscroll = true
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
        Messages
        {messages.map((message, index) => <Message key={message.id} message={message}/>)}
        <div ref={messageAnchorRef}></div>
    </div>
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo( ({message}) => {
    console.log('>>>Message')
    return <div>
        <img src={message.photo} style={{width: '30px'}}/><b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})

const AddNewChatMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')

    const status = useAppSelector(state => state.chat.status)
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
            <Button onClick={sendMessageHandler} disabled={status !== 'ready'}>Send
                message</Button>
        </div>
    </div>
}

export default ChatPage