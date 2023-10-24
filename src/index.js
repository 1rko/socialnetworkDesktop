import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./redux/reduxStore";
import {BrowserRouter, HashRouter} from "react-router-dom";
import './index.css';
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

//export let rerenderEntireTree = (state) => {
    root.render(
        //<React.StrictMode>
            <HashRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </HashRouter>
        //</React.StrictMode>
    );
//}

/*rerenderEntireTree(store.getState());

let state = store.getState()

store.subscribe(() => {
    rerenderEntireTree(state)
})*/

window.state=store.getState() ///просто вывели в глоб переменную, чтоб смотреть state в консоли

