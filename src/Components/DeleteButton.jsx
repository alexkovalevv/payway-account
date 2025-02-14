import React from "react";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";

export const DeleteButton = ({ rowData, onDelete }) => {
    const confirmDelete = () => {
        confirmDialog({
            group: "custom", // Группа для кастомного ConfirmDialog
            message: "Вы уверены, что хотите удалить эту запись?", // Сообщение диалога
            header: "Подтверждение удаления", // Заголовок диалога
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                onDelete(rowData.id); // Вызов функции удаления
            },
            reject: () => {
                // Логика при отмене (можно оставить пустым)
            },
        });
    };

    return (
        <Button
            icon="pi pi-trash"
            rounded
            text
            className="p-button-danger border-none hover:border-none link:border-none"
            onClick={confirmDelete}
        />
    );
};