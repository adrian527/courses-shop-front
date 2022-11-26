import React from "react";
import './App.scss';
import Header from "./components/header/Header";
import StoreProvider from "./store/StoreProvider";
import { HashRouter as Router } from "react-router-dom";
import AsideMenu from "./components/asideMenu/AsideMenu";

const App = () => {
    return (
        <StoreProvider>
            <Header />
            <Router>
                <div className="content-wrapper">
                    <AsideMenu />
                </div>
            </Router>
        </StoreProvider>
    )
}

export default App;