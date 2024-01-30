import {FilterType} from "../redux/usersReducer";
import {UsersDataType} from "types";
import {instance, APIResponseType} from "./Dal";

type GetUsersType = {
    items: Array<UsersDataType>
    totalCount: number
    error: string
}
/*type FollowUnfollowDataType = {
    resultCode: number
    messages: Array<string>
    data: {}
}*/
export const usersAPI = {
    getUsers(currentPage: number = 1, usersCount: number = 10, filter: FilterType) {                    //axios типизирован, автоматически неявно
        return instance.get<GetUsersType>(`users?page=${currentPage} &count=${usersCount} &term=${filter.term} ${filter.friend === null ? ''
            : filter.friend === true ? '&friend=true' : '&friend=false'} `)               //возвращается промис
            .then(response => response.data)                                                    //в <...> - то, что возвращает промис
    },

    followUser(userID: number) {
        return instance.post<APIResponseType>(`follow/${userID}`)
            .then(response => response.data)
    },

    unFollowUser(userID: number) {
        return instance.delete<APIResponseType>(`follow/${userID}`)
            .then(response => response.data)
    }
}