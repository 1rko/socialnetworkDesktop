import {PhotosType, ProfileType} from "types";
import {AxiosResponse} from "axios";
import {instance, APIResponseType} from "./Dal";

export const profileAPI = {
    getProfile(userID: number) {
        return instance.get<ProfileType>(`profile/${userID}`)
            .then(response => response.data)
    },

    getStatus(userID: number) {
        return instance.get<AxiosResponse<string>>(`profile/status/${userID}`)
            .then(response => response.data)
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status/`, {status: status})
            .then(response => response.data)
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<APIResponseType<{photos:{small: string, large: string}}>>(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log (response.data)
                return response.data
            })
    },

    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile/`, profile)
            .then(response => response.data)
    }
}

