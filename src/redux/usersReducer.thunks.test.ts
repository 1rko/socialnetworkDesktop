import {actions, onFollowButtonClickThunkCreator, onUnfollowButtonClickThunkCreator} from "./usersReducer"
import {usersAPI} from "../DAL/UsersAPI"
import {APIResponseType, EnumResultCodes} from "../DAL/Dal";

jest.mock("../DAL/UsersAPI")        //создает ненастоящий об'ект, возвращаемый через import usersAPI
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn();
const getStateMock=jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})


const result: APIResponseType = {
    resultCode: EnumResultCodes.Success,
    data: {},
    messages: []
}

test('follow Thunk SUCCESS', async () => {
    userAPIMock.followUser.mockReturnValue(Promise.resolve(result))

    const thunk = onFollowButtonClickThunkCreator(30881)      //создаем санку с помощью thunkCreator

    await thunk(dispatchMock,getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingIsFetching(true, 30881))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.onFollow(30881))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingIsFetching(false, 30881))
})

test('unFollow Thunk SUCCESS', async () => {
    userAPIMock.unFollowUser.mockReturnValue(Promise.resolve(result))

    const thunk = onUnfollowButtonClickThunkCreator(30881)      //создаем санку с помощью thunkCreator

    await thunk(dispatchMock,getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingIsFetching(true, 30881))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.onUnFollow(30881))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingIsFetching(false, 30881))
})