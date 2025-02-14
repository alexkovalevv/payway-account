import React, {useState, useRef} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Toast} from "primereact/toast";
import {Skeleton} from "primereact/skeleton"; // Импортируем Skeleton
import {DeleteButton} from "./DeleteButton"; // Импортируем компонент DeleteButton
import {CustomConfirmDialog} from "./CustomConfirmDialog"; // Импортируем компонент CustomConfirmDialog

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
                                     editMode = "row",
                                     dataKey = "id",
                                 }) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(rowsPerPageOptions[0]);
    const [localData, setLocalData] = useState(data);
    const toast = useRef(null);

    React.useEffect(() => {
        setLocalData(data);
    }, [data]);

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

    const customPassThrough = {
        loadingOverlay: {
            style: {
                backgroundColor: "rgba(227,227,227,0.3)",
            },
        },
    };

    const handleDelete = (id) => {
        const updatedData = localData.filter((item) => item.id !== id);
        setLocalData(updatedData);
        onDelete(id);
        toast.current.show({
            severity: "success",
            summary: "Успешно",
            detail: "Запись удалена",
            life: 3000,
        });
    };

    // Функция для отображения скелетона
    const renderSkeleton = () => {
        return Array.from({length: perPage}).map((_, index) => ({
            id: `skeleton-${index}`, // Уникальный ключ для каждой строки скелетона
        }));
    };

    return (
        <div className="p-card p-4 w-30">
            <Toast ref={toast}/>
            <CustomConfirmDialog
                group="custom" // Группа для кастомного ConfirmDialog
                onAccept={() => handleDelete(rowData.id)} // Логика подтверждения удаления
                onReject={() => {
                    toast.current.show({
                        severity: "warn",
                        summary: "Отменено",
                        detail: "Удаление отменено",
                        life: 3000,
                    });
                }}
                toast={toast}
            />
            <DataTable
                value={loading ? renderSkeleton() : localData} // Используем массив скелетонов при загрузке
                paginator
                rows={perPage}
                totalRecords={totalRecords}
                lazy
                first={(page - 1) * perPage}
                onPage={handlePage}
                rowsPerPageOptions={rowsPerPageOptions}
                editMode={editMode}
                dataKey={dataKey}
                emptyMessage={emptyMessage}
                onRowEditComplete={onRowEditComplete}
                rowExpansionTemplate={rowExpansionTemplate}
                loading={loading}
                scrollable
                pt={customPassThrough}
                className="text-sm"
            >
                {columns.map((column) => (
                    <Column
                        key={column.field}
                        field={column.field}
                        header={column.header}
                        body={loading ? () => <Skeleton width="100%"
                                                        height="1.5rem"/> : column.body} // Отображаем Skeleton при загрузке
                        editor={column.editor}
                        sortable={column.sortable}
                        style={{
                            ...column.style,
                            textAlign: "left",
                            verticalAlign: "top",
                        }}
                        headerStyle={{textAlign: "left"}}
                        bodyStyle={{textAlign: "left", verticalAlign: "top"}}
                    />
                ))}
                {onDelete && (
                    <Column
                        rowEditor
                        header="Действия"
                        className="text-center valign-top align-top text-sm p-0 pt-1"
                        body={loading ? () => <Skeleton width="100%" height="1.5rem"/> : (rowData) => (
                            <DeleteButton
                                rowData={rowData}
                                onDelete={() => {
                                    confirmDialog({
                                        group: "custom", // Группа для кастомного ConfirmDialog
                                        message: "Вы уверены, что хотите удалить эту запись?",
                                        header: "Подтверждение удаления",
                                        icon: "pi pi-exclamation-triangle",
                                        accept: () => handleDelete(rowData.id),
                                        reject: () => {
                                            toast.current.show({
                                                severity: "warn",
                                                summary: "Отменено",
                                                detail: "Удаление отменено",
                                                life: 3000,
                                            });
                                        },
                                    });
                                }}
                            />
                        )}
                        style={{width: "3rem", textAlign: "left", verticalAlign: "top"}}
                    />
                )}
            </DataTable>
        </div>
    );
};