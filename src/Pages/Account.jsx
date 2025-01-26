import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

// Ваши компоненты
const Home = () => <h2>Главная страница</h2>;
const About = () => <h2>О нас</h2>;
const Profile = () => <h2>Профиль</h2>;

export default function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/about">О нас</Link>
                    </li>
                    <li>
                        <Link to="/profile">Профиль</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </Router>
    );
}
