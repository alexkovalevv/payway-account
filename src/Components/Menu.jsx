import React from "react";
import {Link, useLocation} from "react-router-dom";

export default function Menu() {
    const location = useLocation(); // Хук для получения текущего пути

    const menuItems = [
        {path: "/", icon: "pi pi-wallet", label: "Вывод средств"},
        {path: "/unlock", icon: "pi pi-unlock", label: "Разблокировка средств"},
        {path: "/project", icon: "pi pi-folder-open", label: "Мои проекты"},
        {path: "/profile", icon: "pi pi-id-card", label: "Профиль"},
    ];

    return (
        <ul className="list-none p-3 m-0">
            {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;

                return (
                    <li key={index}>
                        <Link
                            to={item.path}
                            className={`no-underline p-ripple flex align-items-center cursor-pointer p-3 border-round ${
                                isActive ? "text-blue-700 bg-blue-50" : "text-700 hover:surface-100"
                            } transition-duration-150 transition-colors w-full`}
                        >
                            <i className={`${item.icon} mr-2`}></i>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}