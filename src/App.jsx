import React, {useState} from "react";
import {Routes, Route} from "react-router-dom";
import EditProfile from "./Pages/EditProfile";
import Unlock from "./Pages/Unlock";
import Projects from "./Pages/Projects";
import Withdrawal from "./Pages/Withdrawal";
import CreateWithdrawal from "./Pages/CreateWithdrawal";
import Sidebar from "./Components/Sidebar";


export default function App() {
    return (
        <div className="min-h-screen flex relative lg:static surface-ground">
            <Sidebar/>
            <div className="min-h-screen flex flex-column relative flex-auto">
                <div className="p-5 flex flex-column flex-auto">
                    <Routes>
                        <Route path="/" element={<Withdrawal/>}/>
                        <Route path="/create-withdrawal" element={<CreateWithdrawal/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/unlock" element={<Unlock/>}/>
                        <Route path="/profile" element={<EditProfile/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}