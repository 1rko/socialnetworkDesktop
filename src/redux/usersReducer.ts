import {EnumResultCodes, usersAPI} from "../DAL/Dal";
import {UsersDataType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./reduxStore";
import {Dispatch} from "redux";
import {string} from "yup";

let initialState = {
    usersData: [] as Array<UsersDataType>,
    currentPage: 1 as number,
    usersCount: 20 as number,
    totalCount: 0 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>, // array of users ids
    filter:{
        term:'',
        friend: null as boolean | null
    }
}

type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;


const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            };
        case "SET_USERS":
            return {
                ...state, usersData: [...action.usersData]
            }
        case "SET_TOTAL_COUNT":
            return {
                ...state, totalCount: action.totalCount
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state, currentPage: action.currentPage
            }
        case "TOGGLE_IS_FETCHING":
            return {
                ...state, isFetching: action.isFetching
            }
        case "SET_FILTER" :
            return {
                ...state,
                filter: action.payload
            }
        case "TOGGLE_FOLLOWING_IN_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    onFollow: (id: number) => ({type: 'FOLLOW', userId: id} as const),
    onUnFollow: (id: number) => ({type: 'UNFOLLOW', userId: id} as const),
    setUsers: (users: Array<UsersDataType>) => ({type: 'SET_USERS', usersData: users} as const),
    setTotalCount: (totalCount: number) => ({type: 'SET_TOTAL_COUNT', totalCount: totalCount} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage: currentPage} as const),
    setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload:filter} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching: isFetching} as const),
    toggleFollowingIsFetching: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_FOLLOWING_IN_PROGRESS',
        isFetching: isFetching, userId: userId
    } as const)
}

type ThunkType = ThunkAction<void, AppStateType, any, ActionTypes>
type DispatchType = Dispatch<ActionTypes>       //функция из библиотеки redux
type GetStateType = () => AppStateType

export const getUsersThunkCreator = (currentPage: number, usersCount: number, filter: FilterType): ThunkType =>
    (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setFilter(filter))
        usersAPI.getUsers(currentPage, usersCount, filter)
            .then(data => {
                dispatch(actions.setUsers(data.items));
                dispatch(actions.setTotalCount(data.totalCount))
                dispatch(actions.toggleIsFetching(false))
            })
    }

export const onPageChangedThunkCreator = (pageNumber: number, usersCount: number, filter:FilterType): ThunkType =>
    (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(pageNumber))
        usersAPI.getUsers(pageNumber, usersCount, filter)
            .then(data => {
                dispatch(actions.setUsers(data.items));
                dispatch(actions.toggleIsFetching(false))
            })
    }

//type actionCreatorFolwUnfwFlow = typeof onFollow | typeof onUnFollow

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: Function, actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingIsFetching(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === EnumResultCodes.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingIsFetching(false, userId))
}

export const onFollowButtonClickThunkCreator = (userId: number): ThunkType =>
    (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), actions.onFollow)
    }

export const onUnfollowButtonClickThunkCreator = (userId: number): ThunkType =>
    (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unFollowUser.bind(usersAPI), actions.onUnFollow)
    }

export default usersReducer