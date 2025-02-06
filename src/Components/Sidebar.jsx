import React from "react";
import md5 from "md5";
import Menu from "./Menu";
import Logo from "./Icons/Logo";
import {useAuth} from "../AuthContext";
import {useNavigate} from 'react-router-dom';

export default function Sidebar() {
    //const userEmail = "alex.kovalevv@gmail.com"; // Email пользователя
    //const gravatarUrl = `https://www.gravatar.com/avatar/${md5(userEmail.trim().toLowerCase())}?s=28`;
    const navigate = useNavigate();
    const {logout} = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div
            id="app-sidebar-1"
            className="surface-section h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
            style={{width: "280px"}}
        >
            <div className="flex flex-column h-full">
                <div
                    className="flex align-items-center px-5 flex-shrink-0"
                    style={{height: "60px"}}
                >
                    <Logo width={150} height={70} fill="#3D73FF"/>
                </div>
                <div className="overflow-y-auto mt-3">
                    <Menu/>
                </div>

                <div className="mt-auto mx-3">
                    <hr className="mb-3 border-top-1 border-200"/>
                    <ul className="list-none p-0 m-0">
                        {/* Профиль */}
                        <li>
                            <a
                                className="no-underline p-ripple flex cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                href="/profile"
                                data-discover="true"
                            >
                                <i className="pi pi-id-card mr-2"></i>
                                <span className="font-medium">Профиль</span>
                            </a>
                        </li>

                        {/* Выход */}
                        <li>
                            <a
                                href="#"
                                className="no-underline p-ripple flex cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                onClick={handleLogout}
                            >
                                <i className="pi pi-sign-out mr-2"></i>
                                <span className="font-medium">Выход</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}