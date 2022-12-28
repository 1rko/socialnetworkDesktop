import {followAC, setCurrentPageAC, setTotalCountAC, setUsersAC, unFollowAC,} from "../../../redux/usersReducer";
import Users from "./Users";
import { connect } from "react-redux";

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
        setCurrentPage:(currentPage) => {
            dispatch(setCurrentPageAC(currentPage));
        }

    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;
