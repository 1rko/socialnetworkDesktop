import axios from "axios";

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {
            "API-KEY": "0a4e82f0-3a0f-4f07-bd13-4f0796adfac4"
        }
    }
)

export const usersAPI = {
    getUsers(currentPage = 1, usersCount = 10) {
        return instance.get(`users?page=${currentPage} &count=${usersCount}`)
            .then(response => response.data)
    },

    followUser(userID) {
        return instance.post(`follow/${userID}`)
            .then(response => response.data)
    },

    unFollowUser(userID) {
        return instance.delete(`follow/${userID}`)
            .then(response => response.data)
    }
}

export const authAPI = {
    getMe() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    }
}