import React from 'react'
import {
    getUsersThunkCreator,
    onPageChangedThunkCreator,
    onFollowButtonClickThunkCreator, onUnfollowButtonClickThunkCreator
} from "../../../redux/usersReducer";
import Users from "./Users";
import {connect, MapStateToProps} from "react-redux";
import Preloader from "../../Preloader/Preloader";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getTotalCount,
    getUsersCount, getUsersDataSuperSelector
} from "../../../redux/usersSelectors";
import {UsersDataType} from "types";
import {AppStateType} from "../../../redux/reduxStore";

type MapStateToPropsType = {
    currentPage: number
    usersCount: number
    isFetching: boolean
    usersData: Array<UsersDataType>
    totalCount: number
    followingInProgress: Array<number>
}

type MapDispatchToPropsType = {
    getUsers: (currentPage: number, usersCount: number) => void
    onPageChangedInsight: (pageNumber: number, usersCount: number) => void
    onUnfollowButtonClick: (id: number) => void
    onFollowButtonClick: (id: number) => void

   // onFollow: (id: number) => void
    //onUnFollow: (id: number) => void
}

type OwnPropsType = {
    title: string
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class UsersAPIComponent extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, usersCount} = this.props
        this.props.getUsers(currentPage, usersCount)
    }

    onPageChanged = (pageNumber: number) => {
        const {usersCount} = this.props
        this.props.onPageChangedInsight(pageNumber, usersCount);
    }

    render() {
        return (<>
                {this.props.title && <h1>{this.props.title}</h1>}
                {this.props.isFetching ? <Preloader/> : null}
                <Users usersData={this.props.usersData}
                       totalCount={this.props.totalCount}
                       usersCount={this.props.usersCount}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                    //onFollow={this.props.onFollow}
                    //onUnFollow={this.props.onUnFollow}
                    //isFetching={this.props.isFetching}
                    //toggleIsFetching={this.props.toggleIsFetching}
                       followingInProgress={this.props.followingInProgress}
                    //toggleFollowingIsFetching={this.props.toggleFollowingIsFetching}
                       onFollowButtonClick={this.props.onFollowButtonClick}
                       onUnfollowButtonClick={this.props.onUnfollowButtonClick}
                />
            </>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        usersData: getUsersDataSuperSelector(state),
        currentPage: getCurrentPage(state),
        usersCount: getUsersCount(state),
        totalCount: getTotalCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

//Ctrl+b на ф-ции connect -смотрим описание типов дженерика <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {
        getUsers: getUsersThunkCreator, onPageChangedInsight: onPageChangedThunkCreator,
        onFollowButtonClick: onFollowButtonClickThunkCreator, onUnfollowButtonClick: onUnfollowButtonClickThunkCreator
    })(UsersAPIComponent)

