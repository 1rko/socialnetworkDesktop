//let subscribers = [] as SubscriberType[]

let subscribers = {
    'message-received': [] as MessagesRecievedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null;

const closeHandler = () => {
    console.log('WS is closed')
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = ((e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers['message-received'].forEach(s => s(newMessages))
    console.log(newMessages)
})

const openHandler = (() => {
    notifySubscribersAboutStatus('ready')
})

const errorHandler = (() => {
    notifySubscribersAboutStatus('error')
    console.log('ERROR: RESTART PAGE')
})

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()
    notifySubscribersAboutStatus('pending')

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const ChatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventNameType, callback: MessagesRecievedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventNameType, callback: MessagesRecievedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type MessagesRecievedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

type EventNameType = 'message-received' | 'status-changed'

export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export type StatusType = 'pending' | 'ready' | 'error'