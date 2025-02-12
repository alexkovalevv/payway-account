import React, {useRef, useEffect} from "react";
import {Toast} from 'primereact/toast';
import {useSelector, useDispatch} from 'react-redux';
import {clearToast} from '../ToastSlice';
import ProjectsTable from "../Components/ProjectsTable";
import CreateButton from "../Components/CreateButton";
import UnlockTable from "../Components/UnlockTable.jsx";

export default function Projects() {
    const toast = useRef(null);
    const dispatch = useDispatch();
    const {message, severity} = useSelector((state) => state.toast); // Подписываемся на состояние toast

    useEffect(() => {
        if (message) {
            // Показываем сообщение
            toast.current.show({
                severity,
                summary: 'Успешно',
                detail: message,
                life: 3000, // Сообщение будет видно 3 секунды
            });

            // Очищаем сообщение после того, как оно было показано
            setTimeout(() => {
                dispatch(clearToast());
            }, 3000); // Очищаем через 3 секунды
        }
    }, [message, severity, dispatch]);

    return (
        <div className="p-5">
            <Toast ref={toast}/>

            <div className="text-3xl text-900 font-semibold text-lg mt-3">
                Мои проекты
            </div>
            <div className="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left" role="separator">
                <div className="p-divider-content"></div>
            </div>
            <div className="mb-3">
                <CreateButton
                    label="Создать заявку"
                    to="/create-project" // Адрес страницы создания заявки
                />
            </div>

            <ProjectsTable/>
        </div>
    );
}
