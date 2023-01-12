import {addPost, setProfile, toggleIsFetching, updateNewPostText} from "../../../redux/profileReducer";
import Profile from "./Profile";
import {connect} from "react-redux";
import React from "react";
import axios from "axios";
import Preloader from "../../Preloader/Preloader";

class ProfileAPIContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true)

        axios(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
            //console.log(response.data)
            this.props.setProfile(response.data);
            this.props.toggleIsFetching(false)
        })
    }

    render() {
        return (
            <>
                <h1>Profile</h1>
                {this.props.isFetching ? <Preloader/>: null}
                <Profile postData={this.props.postData}
                         newPostText={this.props.newPostText}
                         //isFetching={this.props.isFetching}
                         //toggleIsFetching={this.props.toggleIsFetching}
                         addPost={this.props.addPost}
                         updateNewPostText={this.props.updateNewPostText}
                         //setProfile={this.props.setProfile}
                         profile={this.props.profile}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        isFetching: state.profilePage.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPost(newPostText));
            dispatch(updateNewPostText(''))
        },
        updateNewPostText: (text) => {
            dispatch(updateNewPostText(text))
        },
        setProfile: (profile) => {
            dispatch(setProfile(profile))
        },
        toggleIsFetching:(isFetching) =>{
            dispatch(toggleIsFetching(isFetching))
        }
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileAPIContainer)

export default ProfileContainer;
