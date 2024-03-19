import {Action, applyMiddleware, combineReducers, compose, createStore, legacy_createStore} from "redux";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
//import thunkMiddleWare, {ThunkAction} from 'redux-thunk';
import {thunk, ThunkAction} from 'redux-thunk';
import appReducer from "./appReducer";
import chatReducer from "./chatReducer";

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat:chatReducer
})

type RootReducersType = typeof rootReducers // получаем неявно тип rootReducers
export type AppStateType=ReturnType<RootReducersType> // AppStateType - типизация всего state

/*type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U: never
export type InferActionTypes<T extends {[key: string]: (...args:any[]) => any}> = ReturnType<PropertiesTypes<T>>*/

export type InferActionTypes<T> = T extends {[key: string]: (...args:any[]) =>  infer U} ? U: never //если T соответствует типу [key: string]: (...args:any[]) =>  infer U), т.е. ключ: функция - то верни тип U возвращаемого результата

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

//export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
//const store = createStore(rootReducers, applyMiddleware(thunk));

//let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;
