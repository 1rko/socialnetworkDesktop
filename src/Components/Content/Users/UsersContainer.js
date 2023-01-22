import React from 'react'
import {
    onFollow,
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleIsFetching,
    onUnFollow
} from "../../../redux/usersReducer";
import Users from "./Users";
import {connect} from "react-redux";
import Preloader from "../../Preloader/Preloader";
import {usersAPI} from "../../../DAL/Dal";

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.usersCount)
            .then(data => {
                this.props.setUsers(data.items);
                this.props.setTotalCount(data.totalCount)
                this.props.toggleIsFetching(false)
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        usersAPI.getUsers(pageNumber, this.props.usersCount)
            .then(data => {
                this.props.setUsers(data.items);
                this.props.toggleIsFetching(false)
            })
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
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
        currentPage: state.usersPage.currentPage,
        usersCount: state.usersPage.usersCount,
        totalCount: state.usersPage.totalCount,
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps,
    {onFollow, onUnFollow, setUsers, setTotalCount, setCurrentPage, toggleIsFetching})(UsersAPIComponent)

