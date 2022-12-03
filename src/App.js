import './App.css';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Content from "./Components/Content/Content";


function App(props) {
    return (
        <div className="App">
            <div className="app_wrapper">
                <Header />
                <Navbar />
                <Content
                    contentData={props.appData}
                    dispatch={props.dispatch}
                    store={props.store}
                />
                <Footer />
            </div>
        </div>
    );
}

export default App;
