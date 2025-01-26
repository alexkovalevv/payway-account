import React from "react";
import WithdrawalForm from "../Components/WithdrawalForm";
import {BreadCrumb} from "primereact/breadcrumb";

export default function CreateWithdrawal() {
    const items = [
        {'id': 'withdrawal', 'label': 'Вывод средств', 'url': '/'},
        {'id': 'create-withdrawal', 'label': 'Создание заявки на вывод средств', 'url': '/create-withdrawal'}
    ];
    return (
        <>
            <div className="text-3xl text-900 font-semibold text-lg mt-3">
                Заявка на вывод средств
            </div>
            <div className="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left" role="separator">
                <div className="p-divider-content"></div>
            </div>
            <BreadCrumb model={items}/>
            <WithdrawalForm/>
        </>
    );
}
