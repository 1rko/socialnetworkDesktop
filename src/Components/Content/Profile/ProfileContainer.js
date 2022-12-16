import { addPostCreator, updateNewPostTextCreator } from "../../../redux/profileReducer";
import Profile from "./Profile";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostCreator(newPostText));
            dispatch(updateNewPostTextCreator(''))
        },
        updateNewPostText: (text) => {
            dispatch(updateNewPostTextCreator(text))
        }
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default ProfileContainer;
