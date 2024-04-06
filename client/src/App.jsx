import { useState } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';

function App() {

    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/index" element={<Navigate to="/" />} />

            </Routes>
        </>
    )
}

export default App;
