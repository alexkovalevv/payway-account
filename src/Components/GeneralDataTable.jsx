import React, {useEffect, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Tag} from 'primereact/tag';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {InputNumber} from 'primereact/inputnumber';
import {Button} from "primereact/button";

const statuses = [
    {label: 'PENDING', value: 'PENDING', severity: 'warning'},
    {label: 'COMPLETED', value: 'COMPLETED', severity: 'success'},
    {label: 'CANCELLED', value: 'CANCELLED', severity: 'danger'},
];

export default function GeneralDataTable() {
    const [withdrawals, setWithdrawals] = useState([]);

    useEffect(() => {
        const mockData = [
            {
                id: 1,
                time: '2023-10-01 12:00',
                amount: 100,
                payment_type: 'Visa',
                status: 'PENDING',
                comments: 'Нет примечания',
            },
            {
                id: 2,
                time: '2023-10-02 14:00',
                amount: 200,
                payment_type: 'MasterCard',
                status: 'COMPLETED',
                comments: 'Срочный вывод',
            },
        ];
        setWithdrawals(mockData);
    }, []);

    const onRowEditComplete = (e) => {
        let _withdrawals = [...withdrawals];
        let {newData, index} = e;
        _withdrawals[index] = newData;
        setWithdrawals(_withdrawals);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
                style={{width: '100%'}} // Уменьшаем размер
                className="text-sm p1"
            />
        );
    };

    const numberEditor = (options) => {
        return (
            <InputNumber
                value={options.value}
                onValueChange={(e) => options.editorCallback(e.value)}
                mode="currency"
                currency="USD"
                locale="en-US"
                style={{width: '100%'}} // Уменьшаем размер
                className="text-sm p1"
            />
        );
    };

    const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                onChange={(e) => options.editorCallback(e.value)}
                options={statuses.map((s) => ({label: s.label, value: s.value}))}
                style={{width: '100%'}} // Уменьшаем размер
                className="text-sm p1"
                placeholder="Выберите"
            />
        );
    };

    const statusBodyTemplate = (rowData) => {
        let status = statuses.find((s) => s.value === rowData.status);
        return <Tag value={rowData.status} severity={status ? status.severity : null}/>;
    };

    const paymentTypeBodyTemplate = (rowData) => {
        const icons = {
            Visa: 'pi pi-credit-card',
            MasterCard: 'pi pi-wallet',
            PayPal: 'pi pi-paypal',
            ApplePay: 'pi pi-apple',
            GooglePay: 'pi pi-google',
            Default: 'pi pi-money-bill',
        };

        const icon = icons[rowData.payment_type] || icons.Default;

        return (
            <React.Fragment>
                <i className={icon} style={{marginRight: '0.5rem', fontSize: '1rem'}}></i>
                {rowData.payment_type}
            </React.Fragment>
        );
    };

    return (
        <div className="p-card p-4">
            <DataTable
                value={withdrawals}
                editMode="row"
                dataKey="id"
                onRowEditComplete={onRowEditComplete}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}
                tableStyle={{minWidth: '50rem'}}
            >
                <Column
                    field="time"
                    header="Дата/время"
                    editor={textEditor}
                    //style={{width: '20%'}}
                    sortable
                />
                <Column
                    field="amount"
                    header="Сумма"
                    body={(rowData) => `$${rowData.amount}`}
                    editor={numberEditor}
                    //style={{width: '20%'}}
                    sortable
                />
                <Column
                    field="payment_type"
                    header="Способ оплаты"
                    body={paymentTypeBodyTemplate}
                    editor={textEditor}
                    //style={{width: '20%'}}
                    sortable
                />
                <Column
                    field="comments"
                    header="Примечание"
                    editor={textEditor}
                    //style={{width: '30%'}}
                />
                <Column
                    field="status"
                    header="Статус"
                    body={statusBodyTemplate}
                    editor={statusEditor}
                    //style={{width: '20%'}}
                    sortable
                />
                <Column
                    rowEditor
                    headerStyle={{width: '10%', minWidth: '8rem'}}
                    bodyStyle={{textAlign: 'center', width: '5%'}}
                />
            </DataTable>
        </div>
    );
}