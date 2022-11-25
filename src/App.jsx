import React, { useEffect, useState } from "react";
import './App.scss';

const App = () => {
    const [text, setText] = useState('init');
    useEffect(() => {
        setText('Hello world!!');
    }, []);
    return (
        <header>{text}</header>
    )
}

export default App;