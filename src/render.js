import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import state, {addProfilePost} from "./data";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

export let rerenderEntireTree = (state) => {

    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App appData={state} addProfilePost={addProfilePost}/>
            </BrowserRouter>
        </React.StrictMode>
    );
}

