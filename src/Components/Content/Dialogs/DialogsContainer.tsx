import {addMessageThunkCreator} from "../../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import withAuthRedirect from "../../../HOC/withAuthRedirect";
import {withRouter} from "../../../HOC/withRouter";
import {DialogsDataType, MessageType} from "types";
import {AppStateType} from "../../../redux/reduxStore";

type MapStateToPropsType = {
    dialogsData: Array<DialogsDataType>
    newMessageText: string
    messages: Array<MessageType>
    isAuth: boolean
}

type MapDispatchToPropsType = {
    addMessage: (text: string) => void
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuthorised
    }
}

// @ts-ignore
const DialogsContainer: React.ComponentType =
    compose(
        withRouter,
        connect<MapStateToPropsType, MapDispatchToPropsType, any, AppStateType>(mapStateToProps, {
            addMessage: addMessageThunkCreator//, messageChange: updateNewMessageCreator
        })
        ,
        withAuthRedirect)
        // @ts-ignore
        (Dialogs)

export default DialogsContainer;
