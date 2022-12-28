import React from 'react'
import {followAC, setCurrentPageAC, setTotalCountAC, setUsersAC, unFollowAC,} from "../../../redux/usersReducer";
import Users from "./Users";
import {connect} from "react-redux";
import axios from "axios";
import store from "../../../redux/reduxStore";

class UsersContainer extends React.Component {

    componentDidMount() {
        axios(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage} &count=${this.props.usersCount}`).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalCount(response.data.totalCount)
            console.log(store.getState())
        })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber} &count=${this.props.usersCount}`).then(response => {
            this.props.setUsers(response.data.items);
        })
    }

    render() {

        return (
            <Users usersData={this.props.usersData}
                   totalCount={this.props.totalCount}
                   usersCount={this.props.usersCount}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   onFollow={this.props.onFollow}
                   onUnFollow={this.props.onFollow}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
        currentPage: state.usersPage.currentPage,
        usersCount: state.usersPage.usersCount,
        totalCount: state.usersPage.totalCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFollow: (id) => {
            dispatch(followAC(id));
        },
        onUnFollow: (id) => {
            dispatch(unFollowAC(id));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setTotalCount: (totalCount) => {
            dispatch(setTotalCountAC(totalCount));
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageAC(currentPage));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)

