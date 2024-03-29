//import { render, screen } from '@testing-library/react';
//import App from './App';

 import profileReducer, {actions} from "./profileReducer";

/*test('My first test', () => {
    expect(Math.max(1, 5, 10)).toBe(10);
})*/

let state = {
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
    newPostText: '' as string,
    profile: null,
    isFetching: false as boolean,
    status: 'initialStatus' as string
}

test('posts should be incremented', () => {

    let action = actions.addPost('newPostForTest')
    let newState = profileReducer(state, action)

    expect(newState.postData.length).toBe(5);
});

test('New post text should be HELLO', () => {

    let action = actions.addPost('HELLO')
    let newState = profileReducer(state, action)

    expect(newState.postData[4].postText).toBe('HELLO');
});

test('posts should be decremented', () => {

    let action = actions.deletePost(3)
    let newState = profileReducer(state, action)

    expect( newState.postData.length).toBe(3);
});

