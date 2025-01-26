import React from "react";
import Menu from "./Menu";
import Logo from "./Icons/Logo";

export default function Sidebar() {
    return (
        <div
            id="app-sidebar-1"
            className="surface-section h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
            style={{width: "280px"}}
        >
            <div className="flex flex-column h-full">
                <div className="flex align-items-center px-5 flex-shrink-0"
                     style={{height: "60px"}}
                >
                    <Logo width={150} height={70} fill="#3D73FF"/>
                </div>
                <div className="overflow-y-auto mt-3">
                    <Menu/>
                </div>
            </div>
        </div>
    );
}