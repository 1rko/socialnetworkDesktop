import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./data";
import {BrowserRouter} from "react-router-dom";

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

export let rerenderEntireTree = (state) => {
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App
                    appData={state.getState()}
                    addProfilePost={state.addProfilePost.bind(state)}
                    updateNewPostText={state.updateNewPostText.bind(state)}/>
            </BrowserRouter>
        </React.StrictMode>
    );
}

rerenderEntireTree(store);

store.subscriber(rerenderEntireTree)
