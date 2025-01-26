import React from "react";
import GeneralDataTable from "../Components/GeneralDataTable";
import CreateWithdrawalButton from "../Components/CreateWithdrawalButton";

export default function Withdrawal() {
    return (
        <>
            <div className="text-3xl text-900 font-semibold text-lg mt-3">
                Заявки поданные на вывод средств
            </div>
            <div className="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left" role="separator">
                <div className="p-divider-content"></div>
            </div>
            <div className="mb-3">
                <CreateWithdrawalButton/>
            </div>

            <GeneralDataTable/>
        </>
    );
}
