import {EnumResultCodes, usersAPI} from "../DAL/Dal";
import {UsersDataType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS'

let initialState = {
    usersData: [] as Array<UsersDataType>,
    currentPage: 4 as number,
    usersCount: 20 as number,
    totalCount: 0 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number> // array of users ids
}

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            };
        case SET_USERS:
            return {
                ...state, usersData: [...action.usersData]
            }
        case SET_TOTAL_COUNT:
            return {
                ...state, totalCount: action.totalCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
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

type ActionTypes =
    OnFollowType
    | OnUnFollowType
    | SetUsersType
    | setTotalCountType
    | setCurrentPageType
    | toggleIsFetchingType
    | toggleFollowingIsFetchingType

type OnFollowType =
    ({
        type: typeof FOLLOW,
        userId: number
    })

export const onFollow = (id: number): OnFollowType =>
    ({
        type: FOLLOW,
        userId: id
    })

type OnUnFollowType =
    ({
        type: typeof UNFOLLOW,
        userId: number
    })

export const onUnFollow = (id: number): OnUnFollowType =>
    ({
        type: UNFOLLOW,
        userId: id
    })

type SetUsersType =
    ({
        type: typeof SET_USERS,
        usersData: Array<UsersDataType>
    })

export const setUsers = (users: Array<UsersDataType>): SetUsersType =>
    ({
        type: SET_USERS,
        usersData: users
    })

type setTotalCountType =
    ({
        type: typeof SET_TOTAL_COUNT,
        totalCount: number
    })

export const setTotalCount = (totalCount: number): setTotalCountType =>
    ({
        type: SET_TOTAL_COUNT,
        totalCount: totalCount
    })

type setCurrentPageType =
    ({
        type: typeof SET_CURRENT_PAGE,
        currentPage: number
    })

export const setCurrentPage = (currentPage: number): setCurrentPageType =>
    ({
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    })

type toggleIsFetchingType =
    ({
        type: typeof TOGGLE_IS_FETCHING,
        isFetching: boolean
    })

export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType =>
    ({
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    })

type toggleFollowingIsFetchingType =
    ({
        type: typeof TOGGLE_FOLLOWING_IN_PROGRESS,
        isFetching: boolean
        userId: number
    })

export const toggleFollowingIsFetching = (isFetching: boolean, userId: number): toggleFollowingIsFetchingType =>
    ({
        type: TOGGLE_FOLLOWING_IN_PROGRESS,
        isFetching: isFetching,
        userId: userId
    })

type ThunkType = ThunkAction<void, AppStateType, any, ActionTypes>
type DispatchType = Dispatch<ActionTypes>       //функция из библиотеки redux
type GetStateType = () => AppStateType

export const getUsersThunkCreator = (currentPage: number, usersCount: number): ThunkType =>
    (dispatch) => {

        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, usersCount)
            .then(data => {
                dispatch(setUsers(data.items));
                dispatch(setTotalCount(data.totalCount))
                dispatch(toggleIsFetching(false))
            })
    }

export const onPageChangedThunkCreator = (pageNumber: number, usersCount: number): ThunkType =>
    (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(pageNumber))
        usersAPI.getUsers(pageNumber, usersCount)
            .then(data => {
                dispatch(setUsers(data.items));
                dispatch(toggleIsFetching(false))
            })
    }

type actionCreatorFolwUnfwFlow = typeof onFollow | typeof onUnFollow

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: Function, actionCreator: actionCreatorFolwUnfwFlow) => {
    dispatch(toggleFollowingIsFetching(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === EnumResultCodes.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingIsFetching(false, userId))
}

export const onFollowButtonClickThunkCreator = (userId: number): ThunkType =>
    (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), onFollow)
    }

export const onUnfollowButtonClickThunkCreator = (userId: number): ThunkType =>
    (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unFollowUser.bind(usersAPI), onUnFollow)
    }

export default usersReducer