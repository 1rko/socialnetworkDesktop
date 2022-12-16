import { addPostCreator, updateNewPostTextCreator } from "../../../redux/usersReducer";
import Users from "./Users";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        /*addPost: (newPostText) => {
            dispatch(addPostCreator(newPostText));
            dispatch(updateNewPostTextCreator(''))
        },
        updateNewPostText: (text) => {
            dispatch(updateNewPostTextCreator(text))
        }*/
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;
