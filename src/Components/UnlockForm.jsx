import React, {useState, useRef} from 'react';
import {InputNumber} from 'primereact/inputnumber';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Toast} from 'primereact/toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'; // Импортируем useDispatch
import {showToast} from '../ToastSlice'; // Импортируем action
import {Divider} from 'primereact/divider';

const UnlockForm = () => {
    const [amount, setAmount] = useState(0);
    const [comments, setComments] = useState('');
    const [taxAmount, setTaxAmount] = useState(0);
    const [unlockAmount, setUnlockAmount] = useState(0);
    const toast = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Хук для отправки actions

    const balance = 11203.43; // Максимальная доступная сумма
    const taxPercent = 5; // Процент комиссии

    // Функция для расчета комиссии и итоговой суммы
    const calculateTaxAndUnlock = (amount) => {
        const tax = (amount * taxPercent) / 100;
        const unlock = amount - tax;
        setTaxAmount(tax);
        setUnlockAmount(unlock);
    };

    // Обработчик изменения суммы
    const handleAmountChange = (value) => {
        // Проверяем, что значение является числом и не отрицательным
        if (isNaN(value) || value < 0) {
            value = 0;
        }
        // Ограничиваем значение максимальной доступной суммой
        if (value > balance) {
            value = balance;
        }
        setAmount(value);
        calculateTaxAndUnlock(value);
    };

    // Обработчик нажатия на кнопку "Максимальная сумма"
    const handleMaxAmount = () => {
        setAmount(balance);
        calculateTaxAndUnlock(balance);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Данные для отправки на сервер
        const formData = {
            amount,
            comments,
        };

        try {
            // Отправляем POST-запрос на WordPress REST API
            const response = await axios.post('/wp-json/payway/v1/unlock', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, // Если требуется авторизация
                },
            });

            // Очистка формы после успешной отправки
            setAmount(0);
            setComments('');
            setTaxAmount(0);
            setUnlockAmount(0);

            // Отправляем действие (action) для показа сообщения
            dispatch(showToast({
                message: 'Заявка на разблокировку средств успешно создана!',
                severity: 'success',
            }));

            // Перенаправляем на главную страницу
            navigate('/unlock');
        } catch (error) {
            // Обработка ошибок
            console.error('Ошибка при отправке формы:', error);

            if (error.response) {
                // Ошибка от сервера
                toast.current.show({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: error.response.data.message || 'Произошла ошибка при отправке формы.',
                    life: 3000,
                });
            } else {
                // Ошибка сети или другая ошибка
                toast.current.show({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: 'Сервер недоступен. Попробуйте позже.',
                    life: 3000,
                });
            }
        }
    };

    return (
        <div>
            <Toast ref={toast}/>

            <div className="mt-5 mb-5">
                Вы можете преждевременно снять все или часть своих средств не дожидаясь даты выплаты. Поскольку
                досрочные выплаты осуществляются из собственных средств, за это взимается дополнительная комиссия,
                размер которой
                5%, но может измениться в зависимости от суммы. Доступная для разблокировки сумма имеет ограничение.
                Оставшаяся сумма, указанная ниже, является общей для всех пользователей платформы и может изменяться.
            </div>

            <form onSubmit={handleSubmit} className="payway-draw">
                <div className="pt-6 w-full">
                    <div className="grid formgrid p-fluid mb-4">
                        {/* Левая колонка: Поля для ввода данных */}
                        <div className="col-12 md:col-6">
                            <div className="flex flex-column gap-3">
                                <label htmlFor="amount" className="block">
                                    Сумма к разблокировке
                                </label>
                                <InputNumber
                                    id="amount"
                                    className="w-full"
                                    value={amount}
                                    onValueChange={(e) => handleAmountChange(e.value)}
                                    required
                                    mode="currency"
                                    currency="USD"
                                    locale="ru-RU"
                                    minFractionDigits={2}
                                    maxFractionDigits={2}
                                    min={0}
                                    max={balance}
                                />
                                <Button
                                    type="button"
                                    label="Максимальная сумма"
                                    className="p-button-outlined mt-2 text-700 border-blue-600 hover:border-blue-700"
                                    onClick={handleMaxAmount}
                                />
                            </div>
                        </div>

                        {/* Правая колонка: Расчет комиссии */}
                        <div className="col-12 md:col-6">
                            <div className="p-3 mt-5 surface-card border-1 surface-border border-round">
                                <div className="text-900 font-medium mb-3">Расчет комиссии</div>
                                <Divider/>
                                <div className="flex flex-column gap-2">
                                    <div className="flex justify-content-between">
                                        <span>Комиссия ({taxPercent}%)</span>
                                        <span>${taxAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-content-between">
                                        <span>Вы получите на счёт</span>
                                        <span>${unlockAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Поле для комментариев */}
                    <div className="flex flex-column gap-3 mt-4">
                        <label htmlFor="comments" className="block">
                            Примечание (Необязательно)
                        </label>
                        <InputTextarea
                            id="comments"
                            className="w-full"
                            placeholder="Оставьте комментарий"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            autoResize={false}
                        />
                    </div>
                </div>

                {/* Кнопка отправки формы */}
                <Button
                    type="submit"
                    label="Создать заявку"
                    className="mt-3 bg-blue-500 hover:bg-blue-600 border-blue-600 hover:border-blue-700"
                />
            </form>
        </div>
    );
};

export default UnlockForm;