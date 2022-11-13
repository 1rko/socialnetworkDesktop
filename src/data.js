import {rerenderEntireTree} from "./render";

const state = {
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
        newPostText:'Новый пост из State'
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
}

window.state=state

export const addProfilePost = (newText) => {
    let lastItem = state.profilePage.postData[state.profilePage.postData.length - 1]
    let newPost = {
        id: lastItem.id + 1,
        likesCount: lastItem.likesCount + 1,
        postText: newText
    }
    //updateNewPostText('')
    state.profilePage.postData.push(newPost)
    rerenderEntireTree(state);
}

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText=newText
    console.log("state.profilePage.newPostText "+state.profilePage.newPostText)

    rerenderEntireTree(state);
}

export default state;