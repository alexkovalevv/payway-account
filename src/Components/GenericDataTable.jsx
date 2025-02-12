import React, {useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {confirmDialog} from 'primereact/confirmdialog';

export const GenericDataTable = ({
                                     columns,
                                     data,
                                     totalRecords,
                                     loading,
                                     onPage,
                                     onSort,
                                     onRowEditComplete,
                                     emptyMessage,
                                     rowExpansionTemplate,
                                     onDelete,
                                     rowsPerPageOptions = [5, 10, 25],
                                     editMode = 'row',
                                     dataKey = 'id',
                                 }) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [sortField, setSortField] = useState('time');
    const [sortOrder, setSortOrder] = useState(-1);

    const handlePage = (event) => {
        setPage(event.page + 1);
        setPerPage(event.rows);
        onPage(event);
    };

    const handleSort = (event) => {
        setSortField(event.sortField);
        setSortOrder(event.sortOrder);
        onSort(event);
    };

    return (
        <div className="p-card p-4">
            <DataTable
                value={data}
                paginator
                rows={perPage}
                totalRecords={totalRecords}
                lazy
                first={(page - 1) * perPage}
                onPage={handlePage}
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
                rowsPerPageOptions={rowsPerPageOptions}
                tableStyle={{minWidth: '50rem'}}
                editMode={editMode}
                dataKey={dataKey}
                emptyMessage={emptyMessage}
                onRowEditComplete={onRowEditComplete}
                rowExpansionTemplate={rowExpansionTemplate}
                //loading={loading}
            >
                {columns.map((column) => (
                    <Column
                        key={column.field}
                        field={column.field}
                        header={column.header}
                        body={column.body}
                        editor={column.editor}
                        sortable={column.sortable}
                        style={column.style}
                    />
                ))}
                <Column
                    rowEditor
                    header="Действия"
                    className="text-center valign-top align-top text-sm"
                    body={(rowData, options) => (
                        <>
                            {options.rowEditor?.editing ? (
                                <>
                                    <Button
                                        icon="pi pi-save"
                                        rounded
                                        text
                                        onClick={(e) =>
                                            options.rowEditor?.onSaveClick &&
                                            options.rowEditor?.onSaveClick(e)
                                        }
                                        tooltip="Сохранить"
                                        tooltipOptions={{position: "top"}}
                                    />
                                    <Button
                                        icon="pi pi-times"
                                        rounded
                                        text
                                        onClick={(e) =>
                                            options.rowEditor?.onCancelClick &&
                                            options.rowEditor?.onCancelClick(e)
                                        }
                                        tooltip="Отменить"
                                        tooltipOptions={{position: "top"}}
                                        severity="warning"
                                    />
                                </>
                            ) : (
                                <Button
                                    icon="pi pi-trash"
                                    rounded
                                    text
                                    tooltip="Удалить"
                                    tooltipOptions={{position: "top"}}
                                    severity="danger"
                                    onClick={() =>
                                        confirmDialog({
                                            message: "Вы уверены, что хотите удалить?",
                                            header: "Подтверждение",
                                            icon: "pi pi-exclamation-triangle",
                                            accept: () => onDelete(rowData.id),
                                        })
                                    }
                                />
                            )}
                        </>
                    )}
                    style={{width: '3rem'}}
                />
            </DataTable>
        </div>
    );
};