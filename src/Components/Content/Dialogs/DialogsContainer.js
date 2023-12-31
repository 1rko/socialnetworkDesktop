import { addMessageThunkCreator, updateNewMessageCreator } from "../../../redux/dialogsReducer.tsx";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { compose } from "redux";
import withAuthRedirect from "../../../HOC/withAuthRedirect";
import {withRouter} from "../../../HOC/withRouter";

let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuthorised
    }
}

const DialogsContainer =
    compose(
        withRouter,
        connect(mapStateToProps, {
            addMessage: addMessageThunkCreator, messageChange: updateNewMessageCreator
        })
        ,
        withAuthRedirect)
        (Dialogs)

export default DialogsContainer;
