//import { render, screen } from '@testing-library/react';
//import App from './App';

import { addPost } from "./profileReducer";

test('new post sould be added', () => {
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
        ]
    }

    let action = addPost('newPostForTest')
    let newState = profileReducer = (state, action)

    expect(newState.postData.length).toBe(5);
});
