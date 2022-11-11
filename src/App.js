import './App.css';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter } from 'react-router-dom'
import Content from "./Components/Content/Content";


function App(props) {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="app_wrapper">
                    <Header />
                    <Navbar />
                    <Content contentData={props.appData} addPostInDialog={props.addPostInDialog} />
                    <Footer />
                </div>
            </div>
        </BrowserRouter>

    );
}

export default App;
