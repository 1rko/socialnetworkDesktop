const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE'

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

const dialogsReducer = (state = initialState, action) => {
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

export const addMessageCreator = (newText) =>
({
    type: ADD_NEW_MESSAGE,
    newText: newText
})

export const updateNewMessageCreator = (text) =>
({
    type: UPDATE_NEW_MESSAGE,
    text: text
})

export const addMessageThunkCreator = (newMessageText) =>
    (dispatch) => {
        dispatch(addMessageCreator(newMessageText));
        dispatch(updateNewMessageCreator(''))
    }

export default dialogsReducer