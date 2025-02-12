import React from "react";
import {BreadCrumb} from "primereact/breadcrumb";
import ProjectsForm from "../Components/ProjectsForm.jsx";

export default function CreateUnlock() {
    const items = [
        {'id': 'withdrawal', 'label': 'Мои проекты', 'url': '/projects'},
        {'id': 'create-withdrawal', 'label': 'Создание проекта', 'url': '/create-project'}
    ];
    return (
        <div className="p-5">
            <div className="text-3xl text-900 font-semibold text-lg mt-3">
                Создание проекта
            </div>
            <div className="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left" role="separator">
                <div className="p-divider-content"></div>
            </div>
            <BreadCrumb model={items}/>
            <ProjectsForm/>
        </div>
    );
}
