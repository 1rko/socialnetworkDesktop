import usersReducer, {actions, InitialStateType} from "./usersReducer"

let state:InitialStateType;

beforeEach(()=> {
    state= {
        usersData: [
            {
                name: "Alex",
                id: 1,
                uniqueUrlName:  null,
                photos: {
                    small: null,
                    large: null
                },
                status: "status1",
                followed: false
            },
            {
                name: "Irina",
                id: 2,
                uniqueUrlName:  null,
                photos: {
                    small: null,
                    large: null
                },
                status: "status2",
                followed: false
            },
            {
                name: "Anna",
                id: 3,
                uniqueUrlName:  null,
                photos: {
                    small: null,
                    large: null
                },
                status: "status3",
                followed: true
            },
            {
                name: "Alis",
                id: 4,
                uniqueUrlName:  null,
                photos: {
                    small: null,
                    large: null
                },
                status: "status4",
                followed: true
            }
        ],
        currentPage: 1,
        usersCount: 20,
        totalCount: 0,
        isFetching: false,
        followingInProgress: [],
        filter:{
            term:'',
            friend: null
        }
    }
})

test('followMustBeDone', () => {
    let newState = usersReducer(state, actions.onFollow(2))
    expect(newState.usersData[0].followed).toBeFalsy()
    expect(newState.usersData[1].followed).toBeTruthy()
})

test('unFollowMustBeDone', () => {
    let newState = usersReducer(state, actions.onUnFollow(4))
    expect(newState.usersData[2].followed).toBeTruthy()
    expect(newState.usersData[3].followed).toBeFalsy()
})
