import React, {useRef, useEffect} from "react";
import {Toast} from 'primereact/toast';
import {useSelector, useDispatch} from 'react-redux';
import {clearToast} from '../ToastSlice';
import WithdrawalTable from "../Components/WithdrawalTable";
import CreateButton from "../Components/CreateButton";
import {Link} from "react-router-dom";

export default function Withdrawal() {
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
                Заявки поданные на вывод средств
            </div>
            <div className="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left" role="separator">
                <div className="p-divider-content"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3 items-end">
                <div className="col">
                    <CreateButton
                        label="Создать заявку"
                        to="/create-withdrawal" // Адрес страницы создания заявки
                    />
                </div>
                <div className="col text-right pt-4 text-lg">
                    Баланс для вывода: <span className="text-green-500">$350</span>
                </div>
            </div>
            <WithdrawalTable/>
        </div>
    );
}
