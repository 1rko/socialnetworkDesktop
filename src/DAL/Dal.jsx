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
    },

    login(email, password, rememberMe) {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then(response => response.data)
    },

    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    }

}

export const profileAPI = {
    getProfile(userID) {
        return instance.get(`profile/${userID}`)
            .then(response => response.data)
    },

    getStatus(userID) {
        return instance.get(`profile/status/${userID}`)
            .then(response => response.data)
    },

    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status})
            .then(response => response.data)
    },

    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    }
}
