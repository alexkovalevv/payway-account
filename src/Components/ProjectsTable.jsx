import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData, deleteData, updateData} from '../dataSlice';
import {GenericDataTable} from './GenericDataTable';
import {StatusCell} from './StatusCell';
import {ServiceUrlIcon} from './Icons/ServiceUrlIcon';

const statuses = [{label: 'Отклонен', value: 'rejected', severity: 'danger'}, {
    label: 'На проверке',
    value: 'review',
    severity: 'warning'
}, {label: 'Подтвержден', value: 'approved', severity: 'info'}, {
    label: 'Выплачено',
    value: 'paid',
    severity: 'success'
},];

export const ProjectsTable = () => {
    const dispatch = useDispatch();
    const {data, totalRecords, loading} = useSelector((state) => state.data);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(2);
    const [sortField, setSortField] = useState('time');
    const [sortOrder, setSortOrder] = useState(-1);

    const endpoint = '/wp-json/payway/v1/projects';

    useEffect(() => {
        console.log(perPage);
        dispatch(fetchData({endpoint, page, perPage, sortField, sortOrder}));
    }, [dispatch, page, perPage, sortField, sortOrder]);

    const handlePage = (event) => {
        setPage(event.page + 1);
        setPerPage(event.rows);
    };

    const handleSort = (event) => {
        setSortField(event.sortField);
        setSortOrder(event.sortOrder);
    };

    const handleDelete = (id) => {
        dispatch(deleteData({endpoint, id}));
    };

    const onRowEditComplete = (e) => {
        const {newData} = e;
        dispatch(updateData({endpoint, id: newData.id, updatedData: newData}));
    };

    const columns = [{
        field: 'url', header: 'Детали проекта', body: (rowData) => (

            <div>
                <div className="grid">
                    <div className="col-12 mb-3 text-sm">
                        <ServiceUrlIcon url={rowData.url}/>
                        <span className="ml-2">{rowData.url}</span>
                    </div>

                    <div className="col-12 text-xs border-1 border-200 border-round-xs mb-3 surface-50">
                        <strong className="font-semibold"><i className="pi pi-comment mr-2"></i>Комментарий:</strong>
                        <p className="text-400 font-italic pl-4">{rowData.comments || 'Нет данных'}</p>
                    </div>
                    <div className="col-12 md:col-6 p-0 text-xs">
                        <div className="col-12">
                            <strong className="font-semibold"><i className="pi pi-chart-line mr-2"></i>Оборот в
                                месяц:</strong> ${rowData.amount || 'Нет данных'}
                        </div>
                        <div className="col-12">
                            <strong className="font-semibold"><i className="pi pi-users mr-2"></i>Количество
                                пользователей:</strong> {rowData.count_users || 'Нет данных'}
                        </div>
                    </div>
                    <div className="col-12 md:col-6 text-xs">
                        <div className="col-12">
                            <strong className="font-semibold"><i className="pi pi-phone mr-2"></i>Контактные
                                данные:</strong> {rowData.contacts || 'Нет данных'}
                        </div>
                    </div>
                </div>
            </div>), sortable: false
    }, {
        field: 'time',
        header: 'Дата',
        sortable: true,
        className: 'align-top text-sm',
        style: {width: '13rem', verticalAlign: 'top'}
    },

        {
            field: 'status',
            header: 'Статус',
            body: (rowData) => <StatusCell rowData={rowData} statuses={statuses}/>,
            sortable: true,
            className: 'align-top text-sm',
            style: {width: '8rem', verticalAlign: 'top'}
        }];

    return (<div>
        <GenericDataTable
            columns={columns}
            data={data}
            totalRecords={totalRecords}
            loading={loading}
            onPage={handlePage}
            onSort={handleSort}
            onRowEditComplete={onRowEditComplete}
            emptyMessage="Еще нет ни одного проекта"
            rowsPerPageOptions={[2, 3, 5]}
        />
    </div>);
};

export default ProjectsTable;