import {BaseThunkType, InferActionTypes} from "./reduxStore";
import {ChatMessageType, ChatAPI, StatusType} from "../DAL/ChatAPI";
import {Dispatch} from "redux";

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pendind' as StatusType
}

export type InitialStateType = typeof initialState // создаем тип на основе initialState

const chatReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        case 'SN/chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        case 'SN/chat/CLEAN_MESSAGES_IN_STATE':
            return {
                ...state,
                messages: []
            };
        default:
            return state;
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) =>
        ({type: 'SN/chat/MESSAGES_RECEIVED', payload: {messages}} as const),
    statusChanged: (status: StatusType) =>
        ({type: 'SN/chat/STATUS_CHANGED', payload: {status}} as const),
    cleanMessagesInSTate: () =>
        ({type: 'SN/chat/CLEAN_MESSAGES_IN_STATE'} as const),
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
let newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
let statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const StartMessagesListening = (): AuthThunkType =>
    async (dispatch) => {
        ChatAPI.start()
        ChatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
        ChatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
    }

export const StopMessagesListening = (): AuthThunkType =>
    async (dispatch) => {
        ChatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
        ChatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
        ChatAPI.stop()
    }

export const SendMessage = (message: string): AuthThunkType =>
    async (dispatch) => {
        ChatAPI.sendMessage(message)
    }

type ActionsTypes = InferActionTypes<typeof actions>
type AuthThunkType = BaseThunkType<ActionsTypes> // мы создали дженерик в redux-store

export default chatReducer