const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'


let initialState = {
    usersData: [ ]
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
            debugger
            return {
                ...state, usersData: [...state.usersData, ...action.usersData]
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

export default usersReducer