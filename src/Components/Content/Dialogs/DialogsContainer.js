import {addMessageCreator, updateNewMessageCreator} from "../../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../../../HOC/withAuthRedirect";

let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
        isAuthorised:state.auth.isAuthorised
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (newMessageText) => {
            dispatch(addMessageCreator(newMessageText));
            dispatch(updateNewMessageCreator(''))
        },
        messageChange: (text) => {
            dispatch(updateNewMessageCreator(text))
        }
    }
}

const withAuthRedirectDialogsContainer=withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(withAuthRedirectDialogsContainer)

export default DialogsContainer;
