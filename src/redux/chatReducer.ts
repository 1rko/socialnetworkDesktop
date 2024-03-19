import {BaseThunkType, InferActionTypes} from "./reduxStore";
import {ChatMessageType, ChatAPI} from "../DAL/ChatAPI";
import {Dispatch} from "redux";

let initialState = {
    messages: [] as ChatMessageType[]
}

export type InitialStateType = typeof initialState // создаем тип на основе initialState

const chatReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGES_RECIEVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }

        default:
            return state;
    }
}

const actions = {
    messagesRecieved: (messages: ChatMessageType[]) =>
        ({type: 'SN/chat/MESSAGES_RECIEVED', payload: {messages}}as const),
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
let newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesRecieved(messages))
        }
    }
    return _newMessageHandler
}

export const StartMessagesListening = (): AuthThunkType =>
    async (dispatch) => {
        ChatAPI.start()
        ChatAPI.subscribe(newMessageHandlerCreator(dispatch))
    }

export const StopMessagesListening = (): AuthThunkType =>
    async (dispatch) => {
        ChatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
        ChatAPI.stop()
    }

export const SendMessage = (message:string): AuthThunkType =>
    async (dispatch) => {
        ChatAPI.sendMessage(message)
    }

type ActionsTypes = InferActionTypes<typeof actions>
type AuthThunkType = BaseThunkType<ActionsTypes> // мы создали дженерик в redux-store

export default chatReducer