import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./reduxStore";
import {DialogsDataType, MessageType} from "types";

let initialState = {
    dialogsData: [
        {
            id: 1,
            name: 'Ivan',
            age: 20,
            messages: ['Hello', 'My name is Ivan']
        },
        {
            id: 2,
            name: 'Peter',
            age: 22,
            messages: ['Hi', 'My name is Peter']
        },
        {
            id: 3,
            name: 'Ira',
            age: 33,
            messages: ['Good morning', 'My name is Ira']
        }
    ] as Array<DialogsDataType>,
    newMessageText: '' as string,
    messages: [
        {
            id: 1,
            message: "Привет"
        },
        {
            id: 2,
            message: "Меня зовут"
        },
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState // создаем тип на основе initialState

const dialogsReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case "dialogsReduser/ADD_NEW_MESSAGE": {
            let lastItem = state.messages[state.messages.length - 1]
            let newMessage = {
                id: lastItem.id + 1,
                message: action.text
            }
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        }

        case "dialogsReduser/UPDATE_NEW_MESSAGE":
            return {
                ...state,
                newMessageText: action.text
            }

        default:
            return state;
    }
}

type ActionsTypes = InferActionTypes<typeof actions>

export let actions = {
    addMessageCreator: (newText: string) => ({type: 'dialogsReduser/ADD_NEW_MESSAGE', text: newText} as const),
    updateNewMessageCreator: (text: string) => ({type: 'dialogsReduser/UPDATE_NEW_MESSAGE', text: text} as const)
}

type ThunkType = ThunkAction<void, AppStateType, any, ActionsTypes>

export const addMessageThunkCreator = (newMessageText: string): ThunkType =>
    (dispatch) => {
        dispatch(actions.addMessageCreator(newMessageText));
        dispatch(actions.updateNewMessageCreator(''))
    }

export default dialogsReducer