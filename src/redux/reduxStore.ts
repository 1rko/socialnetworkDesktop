import {Action, applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleWare, {ThunkAction} from 'redux-thunk';
import appReducer from "./appReducer";

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})

type RootReducersType = typeof rootReducers // получаем неявно тип rootReducers
export type AppStateType=ReturnType<RootReducersType> // AppStateType - типизация всего state

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U: never
export type InferActionTypes<T extends {[key: string]: (...args:any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

//let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;
