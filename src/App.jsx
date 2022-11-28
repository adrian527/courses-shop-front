import React from "react";
import './App.scss';
import Header from "./components/header/Header";
import StoreProvider from "./store/StoreProvider";
import { HashRouter as Router } from "react-router-dom";
import AsideMenu from "./components/asideMenu/AsideMenu";
import Content from "./components/content/Content";

const App = () => {
    return (
        <StoreProvider>
            <Header />
            <Router>
                <div className="content-wrapper">
                    <AsideMenu />
                    <Content />
                </div>
            </Router>
        </StoreProvider>
    )
}

export default App;