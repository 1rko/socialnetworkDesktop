import {combineReducers, legacy_createStore} from "redux";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";

let reducers=combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer
})

let store = legacy_createStore(reducers);

export default store;