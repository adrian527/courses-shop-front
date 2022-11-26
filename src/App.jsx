import React, { useEffect, useState } from "react";
import './App.scss';
import Header from "./components/header/Header";
import StoreProvider from "./store/StoreProvider";

const App = () => {
    return (
        <StoreProvider>
            <Header />
        </StoreProvider>
    )
}

export default App;