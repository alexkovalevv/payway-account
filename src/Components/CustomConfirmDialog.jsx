import React from "react";
import {ConfirmDialog} from "primereact/confirmdialog";
import {Button} from "primereact/button";

export const CustomConfirmDialog = ({group, onAccept, onReject, toast}) => {
    return (
        <ConfirmDialog
            group={group} // Группа для кастомного ConfirmDialog
            content={({headerRef, contentRef, footerRef, hide}) => (
                <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
                    <div
                        className="border-circle bg-blue-500 inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                        <i className="pi pi-question text-5xl text-white"></i>
                    </div>
                    <span className="font-bold text-2xl block mb-2 mt-4" ref={headerRef}>
                        Подтверждение удаления
                    </span>
                    <p className="mb-0" ref={contentRef}>
                        Вы уверены, что хотите удалить эту запись?
                    </p>
                    <div className="flex align-items-center gap-2 mt-4" ref={footerRef}>
                        <Button
                            label="Удалить"
                            size="small"
                            className="p-button-danger w-8rem"
                            onClick={(event) => {
                                hide(event);
                                onAccept(); // Вызов функции подтверждения
                            }}
                        />
                        <Button
                            label="Отмена"
                            size="small"
                            outlined
                            className="p-button-secondary w-8rem"
                            onClick={(event) => {
                                hide(event);
                                onReject(); // Вызов функции отмены
                            }}
                        />
                    </div>
                </div>
            )}
        />
    );
};