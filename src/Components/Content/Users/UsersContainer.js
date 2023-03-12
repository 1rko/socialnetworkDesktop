import React from 'react'
import {
    onFollow,
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleIsFetching,
    onUnFollow,
    toggleFollowingIsFetching,
    getUsersThunkCreator,
    onPageChangedThunkCreator,
    onFollowButtonClickThunkCreator, onUnfollowButtonClickThunkCreator
} from "../../../redux/usersReducer";
import Users from "./Users";
import {connect} from "react-redux";
import Preloader from "../../Preloader/Preloader";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getTotalCount,
    getUsersCount, getUsersData, getUsersDataSuperSelector
} from "../../../redux/usersSelectors";

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.usersCount)
    }

    onPageChanged = (pageNumber) => {
        this.props.onPageChangedInsight(pageNumber, this.props.usersCount);
    }

    render() {
        return (<>
                {this.props.isFetching ? <Preloader/> : null}
                <Users usersData={this.props.usersData}
                       totalCount={this.props.totalCount}
                       usersCount={this.props.usersCount}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       onFollow={this.props.onFollow}
                       onUnFollow={this.props.onUnFollow}
                       isFetching={this.props.isFetching}
                       toggleIsFetching={this.props.toggleIsFetching}
                       followingInProgress={this.props.followingInProgress}
                       toggleFollowingIsFetching={this.props.toggleFollowingIsFetching}
                       onFollowButtonClick={this.props.onFollowButtonClick}
                       onUnfollowButtonClick={this.props.onUnfollowButtonClick}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usersData: getUsersDataSuperSelector(state),
        currentPage: getCurrentPage(state),
        usersCount: getUsersCount(state),
        totalCount: getTotalCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default connect(mapStateToProps,
    {
        onFollow, onUnFollow, setUsers,
        setTotalCount, setCurrentPage, toggleIsFetching,
        toggleFollowingIsFetching, getUsers: getUsersThunkCreator, onPageChangedInsight: onPageChangedThunkCreator,
        onFollowButtonClick: onFollowButtonClickThunkCreator, onUnfollowButtonClick: onUnfollowButtonClickThunkCreator
    })(UsersAPIComponent)

