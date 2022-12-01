const ADD_PROFILE_POST = 'ADD-PROFILE-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE'
const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'

export const store = {
    _state: {
        profilePage: {
            postData: [
                {
                    id: 1,
                    likesCount: 11,
                    postText: "Hi"
                },
                {
                    id: 2,
                    likesCount: 12,
                    postText: "My name is"
                },
                {
                    id: 3,
                    likesCount: 13,
                    postText: "How are you"
                },
                {
                    id: 4,
                    likesCount: 14,
                    postText: "I am fine"
                }
            ],
            newPostText: 'Новый пост из State'
        },
        dialogsPage: {
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
            newMessageText: ''
        },
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
    },

    _callSubscriber() {// функция - обработчик подписчика

    },

    getState() {
        return this._state
    },

    addProfilePost: function (newText) {
        let lastItem = this._state.profilePage.postData[this._state.profilePage.postData.length - 1]
        let newPost = {
            id: lastItem.id + 1,
            likesCount: lastItem.likesCount + 1,
            postText: newText
        }
        this._state.profilePage.postData.push(newPost)
        this._callSubscriber(this);
    },

    updateNewPostText: function (newText) {
        this._state.profilePage.newPostText = newText
        this._callSubscriber(this);
    },

    addMessage: function (newText) {
        let lastItem = this._state.dialogsPage.dialogsData[this._state.dialogsPage.dialogsData.length - 1]
        let newMessage = {
            id: lastItem.id + 1,
            message: newText
        }
        this._state.messages.push(newMessage)
        this._callSubscriber(this);
    },

    updateNewMessage: function (newText) {
        this._state.dialogsPage.newMessageText = newText
        this._callSubscriber(this);
        console.log("newText - "+newText)
        console.log("this._state.dialogsPage.newMessageText - "+this._state.dialogsPage.newMessageText)

    },

    subscriber: function (observer) {// функция - которой передается обработчик подписчика
        this._callSubscriber = observer;
    },

    dispatch(action) {

        if (action.type === ADD_PROFILE_POST) {
            this.addProfilePost(action.newText)
        } else {
            if (action.type === UPDATE_NEW_POST_TEXT) {
                this.updateNewPostText(action.text)
            }
            else {
                if (action.type === UPDATE_NEW_MESSAGE) {
                    this.updateNewMessage(action.text)
                }
                else {
                    if (action.type === ADD_NEW_MESSAGE) {
                        this.addMessage(action.newText)
                    }
                }
            }
        }
    }

};

export const addPostCreator = (newText) =>
    ({
        type: ADD_PROFILE_POST,
        newText: newText
    })

export const updateNewPostTextCreator = (text) =>
    ({
        type: UPDATE_NEW_POST_TEXT,
        text: text
    })

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

window.state = store._state

export default store;