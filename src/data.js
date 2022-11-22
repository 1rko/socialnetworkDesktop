
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
        dialogs: [
            {
                id: 1,
                name: "Ivan",
                age: 20
            },
            {
                id: 2,
                name: "Peter",
                age: 22
            },
            {
                id: 3,
                name: "Ira",
                age: 33
            }
        ],
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

    subscriber: function (observer) {// функция - которой передается обработчик подписчика
        this._callSubscriber = observer;
    },

    dispatch(action) {

        if (action.type === 'ADD-PROFILE-POST') {
            this.addProfilePost(action.newText)
        }
        else {
            if (action.type === 'UPDATE-NEW-POST-TEXT') {
                this.updateNewPostText(action.text)
            }
        }
    }

};

window.state = store._state

export default store;