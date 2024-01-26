export type PostDataType = {
    id: number
    likesCount: number
    postText: string
}

export type DialogsDataType = {
    id: number,
    name: string,
    age: number,
    messages: string []
}

export type MessageType = {
    id: number,
    message: string
}

export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    aboutMe?: string | null
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}

export type UsersDataType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: PhotosType
    status: string | null
    followed: boolean
}

export type SetAuthUserDataPayloadType = {
    id: number | null
    login: string | null
    email: string | null
    isAuthorised: boolean
    captchaUrl: string | null
}