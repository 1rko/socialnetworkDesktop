const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE'

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            let lastItem = state.dialogsData[state.dialogsData.length - 1]
            let newMessage = {
                id: lastItem.id + 1,
                message: action.newText
            }
            state.messages.push(newMessage)
            return state;
        case UPDATE_NEW_MESSAGE:
            state.newMessageText = action.text
            return state;
    }
}

export default dialogsReducer