import React, {useEffect, useState, useRef} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Tag} from 'primereact/tag';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {InputNumber} from 'primereact/inputnumber';
import {Button} from 'primereact/button';
import {Tooltip} from 'primereact/tooltip';
import axios from 'axios';

const statuses = [
    {label: 'Отклонен', value: 'rejected', severity: 'danger'},
    {label: 'На проверке', value: 'review', severity: 'warning'},
    {label: 'Подтвержден', value: 'approved', severity: 'info'},
    {label: 'Выплачено', value: 'paid', severity: 'success'},
];

export default function GeneralDataTable() {
    const [withdrawals, setWithdrawals] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [sortField, setSortField] = useState('time');
    const [sortOrder, setSortOrder] = useState(-1);

    useEffect(() => {
        fetchWithdrawals();
    }, [page, perPage, sortField, sortOrder]);

    const fetchWithdrawals = async () => {
        try {
            const response = await axios.get('/wp-json/payway/v1/withdrawal', {
                params: {
                    page,
                    per_page: perPage,
                    order_by: sortField,
                    order: sortOrder === 1 ? 'ASC' : 'DESC',
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            });

            setWithdrawals(response.data.data);
            setTotalRecords(response.data.meta.total_records);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    const onPage = (event) => {
        setPage(event.page + 1);
        setPerPage(event.rows);
    };

    const onSort = (event) => {
        setSortField(event.sortField);
        setSortOrder(event.sortOrder);
    };

    const statusBodyTemplate = (rowData) => {
        let status = statuses.find((s) => s.value === rowData.status);
        return <Tag value={status ? status.label : rowData.status} severity={status ? status.severity : null}/>;
    };

    const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                onChange={(e) => options.editorCallback(e.value)}
                options={statuses}
                optionLabel="label"
                optionValue="value"
                style={{width: '100%'}}
                className="text-sm p1"
                placeholder="Выберите статус"
            />
        );
    };

    const paymentTypeBodyTemplate = (rowData) => {
        const icons = {
            swift: 'pi pi-globe',
            cards: 'pi pi-credit-card',
            cryptocurrency: 'pi pi-bitcoin',
        };

        const icon = icons[rowData.payment_type] || 'pi pi-question-circle'; // Иконка по умолчанию

        return (
            <>
                <Tooltip target=".payment-type-cell" style={{fontSize: '0.7rem'}} position="bottom"/>
                <div className="payment-type-cell text-center" data-pr-tooltip={rowData.payment_type}>
                    <i className={icon} style={{fontSize: '1.5rem'}}></i>
                </div>
            </>
        );
    };

    const commentsBodyTemplate = (rowData) => {
        const comment = rowData.comments || 'Нет примечания';
        const isTruncated = comment.length > 55;
        const truncatedComment = isTruncated ? `${comment.substring(0, 55)}...` : comment;

        return (
            <>
                {isTruncated &&
                    <Tooltip
                        target=".comments-cell"
                        showDelay="100"
                        position="bottom"
                        style={{width: '25rem', fontSize: '0.7rem'}}
                    />
                }
                <div className="comments-cell" data-pr-tooltip={isTruncated ? comment : null}>
                    <span>{truncatedComment}</span>
                </div>
            </>
        );
    };

    return (
        <div className="p-card p-4">


            <DataTable
                value={withdrawals}
                paginator
                rows={perPage}
                totalRecords={totalRecords}
                lazy
                first={(page - 1) * perPage}
                onPage={onPage}
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={onSort}
                rowsPerPageOptions={[5, 10, 25]}
                tableStyle={{minWidth: '50rem'}}
            >
                <Column field="time" header="Дата/время" sortable/>
                <Column field="amount" header="Сумма" body={(rowData) => `$${rowData.amount}`} sortable/>
                <Column field="payment_type" header="Способ оплаты" body={paymentTypeBodyTemplate} sortable/>
                <Column field="comments" style={{width: '25rem'}} header="Примечание" body={commentsBodyTemplate}/>
                <Column
                    field="status"
                    header="Статус"
                    body={statusBodyTemplate}
                    editor={statusEditor}
                    sortable
                />
            </DataTable>
        </div>
    );
}