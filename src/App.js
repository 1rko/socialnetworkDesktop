import './App.css';
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Content from "./Components/Content/Content";
import HeaderContainer from "./Components/Header/HeaderContainer"
import {Component} from "react";
import {connect} from "react-redux";
//import {getAuthUserDataThunkCreator, logoutThunkCreator, setAuthUserData, userIsAuthorised} from "./redux/authReducer";
import {withRouter} from "./HOC/withRouter";
import {compose} from "redux";
import Preloader from "./Components/Preloader/Preloader";
import {initializeApp} from './redux/appReducer.tsx';

class App extends Component {
    componentDidMount() {
        this.props.initializeApp()
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
                        store={this.props.store}
                    />
                    <Footer/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(
        mapStateToProps, {initializeApp}))(App)


