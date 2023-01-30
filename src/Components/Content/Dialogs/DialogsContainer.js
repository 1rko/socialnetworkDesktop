import {addMessageCreator, updateNewMessageCreator} from "../../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../../../HOC/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
        isAuthorised: state.auth.isAuthorised
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

const DialogsContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)(Dialogs)

export default DialogsContainer;
