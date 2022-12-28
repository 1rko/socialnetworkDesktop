const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'


let initialState = {
    usersData: [],
    currentPage: 4,
    usersCount: 20,
    totalCount: 0
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            };
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
        default:
            return state;
    }
}

export const followAC = (id) =>
    ({
        type: FOLLOW,
        userId: id
    })

export const unFollowAC = (id) =>
    ({
        type: UNFOLLOW,
        userId: id
    })

export const setUsersAC = (users) =>
    ({
        type: SET_USERS,
        usersData: users
    })

export const setTotalCountAC = (totalCount) =>
    ({
        type: SET_TOTAL_COUNT,
        totalCount: totalCount
    })
export const setCurrentPageAC = (currentPage) =>
    ({
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    })

export default usersReducer