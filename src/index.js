import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const postData = [
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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App postData={postData}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
