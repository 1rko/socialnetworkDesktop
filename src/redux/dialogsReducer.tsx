const ADD_NEW_MESSAGE = 'dialogReducer/ADD_NEW_MESSAGE'
const UPDATE_NEW_MESSAGE = 'dialogReducer/UPDATE_NEW_MESSAGE'

type DialogsDataType = {
    id: number,
    name: string,
    age: number,
    messages: string []
}

type Messages = {
    id: number,
    message: string
}

type InitialStateType = {
    dialogsData: Array<DialogsDataType>
    newMessageText: string
    messages: Array<Messages>
}

let initialState: InitialStateType = {
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
    ],
    newMessageText: '',
    messages: [
        {
            id: 1,
            message: "Привет"
        },
        {
            id: 2,
            message: "Меня зовут"
        },
    ]
}

const dialogsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_NEW_MESSAGE: {
            let lastItem = state.messages[state.messages.length - 1]
            let newMessage = {
                id: lastItem.id + 1,
                message: action.newText
            }
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        }
        case UPDATE_NEW_MESSAGE:
            return {
                ...state,
                newMessageText: action.text
            }
        default:
            return state;
    }
}

export type addMessageCreatorActionType = {
    type: typeof ADD_NEW_MESSAGE,
    newText: string
}

export const addMessageCreator = (newText: string): addMessageCreatorActionType =>
    ({
        type: ADD_NEW_MESSAGE,
        newText: newText
    })

export type UpdateNewMessageCreatorActionType = {
    type: typeof UPDATE_NEW_MESSAGE,
    text: string
}

export const updateNewMessageCreator = (text: string): UpdateNewMessageCreatorActionType =>
    ({
        type: UPDATE_NEW_MESSAGE,
        text: text
    })

export const addMessageThunkCreator = (newMessageText: any) =>
    (dispatch: any) => {
        dispatch(addMessageCreator(newMessageText));
        dispatch(updateNewMessageCreator(''))
    }

export default dialogsReducer