import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Home from "../../pages/home";
import Profil from "../../pages/profil";
import Trending from "../../pages/trending";
import Navbar from "../Navbar";

const Index = () => {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/profil" element={<Profil/>}/>
                <Route exact path="/trending" element={<Trending/>}/>
                <Route exact path="*" element={<Navigate to ="/" />}/>
            </Routes>

        </Router>
    );
};

export default Index;