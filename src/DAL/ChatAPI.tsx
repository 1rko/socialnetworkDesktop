let subscribers = [] as SubscriberType[]

let ws: WebSocket | null = null;

const closeHandler = () => {
    console.log('WS is closed')
    setTimeout(createChannel, 3000)
}

const messageHandler = ((e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(s=>s(newMessages))
    console.log(newMessages)
})

function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}

export const ChatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers=[]
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message:string) {
        ws?.send(message)
    }
}

type SubscriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}