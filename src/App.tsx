import './App.css';
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Content from "./Components/Content/Content";
import HeaderContainer from "./Components/Header/HeaderContainer"
import {Component, ComponentType} from "react";
import {connect} from "react-redux";
//import {getAuthUserDataThunkCreator, logoutThunkCreator, setAuthUserData, userIsAuthorised} from "./redux/authReducer";
import {withRouter} from "./HOC/withRouter";
import {compose} from "redux";
import Preloader from "./Components/Preloader/Preloader";
import {initializeApp} from './redux/appReducer';
import {AppStateType} from "./redux/reduxStore";

type AppPropsType = MapStateToPropsType & MapDispatchToPropsType

class App extends Component<AppPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occured')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="App">
                <div className="app_wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <Content
                        /*store={this.props.store}*/
                    />
                    <Footer/>
                </div>
            </div>
        );
    }
}

type MapStateToPropsType = {
    initialized: boolean
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
})

type MapDispatchToPropsType = {
    initializeApp: () => void
}

export default compose<ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, any, AppStateType>(
        mapStateToProps, {initializeApp}))(App)


