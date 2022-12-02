import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

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
        },
    },

    _callSubscriber() {// функция - обработчик подписчика

    },

    getState() {
        return this._state
    },

    subscriber: function (observer) {// функция - которой передается обработчик подписчика
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage=profileReducer(this._state.profilePage, action)
        this._state.dialogsPage=dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this);
    }

};

window.state = store._state

export default store;