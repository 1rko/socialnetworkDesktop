const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE'

let initialState = {
    usersData: [
        {
            id: 1,
            name: 'IIIIIIIIII',
            age: 20,
            messages: ['Hello', 'My name is Ivan']
        },
        {
            id: 2,
            name: 'PPPPPPP',
            age: 22,
            messages: ['Hi', 'My name is Peter']
        },
        {
            id: 3,
            name: 'Ira',
            age: 33,
            messages: ['Good morning', 'My name is Ira']
        }
    ]
}

const usersReducer = (state = initialState, action) => {
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

export default usersReducer