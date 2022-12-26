import {followAC, setUsersAC, unFollowAC,} from "../../../redux/usersReducer";
import Users from "./Users";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
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
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;
