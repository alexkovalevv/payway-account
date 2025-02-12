import React from "react";
import {BreadCrumb} from "primereact/breadcrumb";
import UnlockForm from "../Components/UnlockForm.jsx";

export default function CreateUnlock() {
    const items = [
        {'id': 'withdrawal', 'label': 'Разблокировка средств', 'url': '/unlock'},
        {'id': 'create-withdrawal', 'label': 'Создание заявки на вывод средств', 'url': '/create-unlock'}
    ];
    return (
        <div className="p-5">
            <div className="text-3xl text-900 font-semibold text-lg mt-3">
                Заявка на вывод средств
            </div>
            <div className="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left" role="separator">
                <div className="p-divider-content"></div>
            </div>
            <BreadCrumb model={items}/>
            <UnlockForm/>
        </div>
    );
}
