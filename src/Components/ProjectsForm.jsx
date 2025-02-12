import React, {useState, useRef} from 'react';
import {InputText} from 'primereact/inputtext';
import {InputNumber} from 'primereact/inputnumber';
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import {classNames} from 'primereact/utils';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {showToast} from '../ToastSlice';

const ProjectsForm = () => {
    const [formData, setFormData] = useState({
        url: '',
        amount: '',
        count_users: '',
        comments: '',
        contacts: '',
    });
    const [errors, setErrors] = useState({});
    const toast = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateField = (name, value) => {
        let error = '';
        if (value === null || value === undefined) {
            value = ''; // Устанавливаем значение по умолчанию, если оно null или undefined
        }

        switch (name) {
            case 'url':
                if (!value) error = 'Поле ссылка на проект обязательно для заполнения!';
                else if (value.length > 350) error = 'Длина URL не должна превышать 350 символов!';
                else if (!/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z\u0401\u0451\u0410-\u044f0-9@:%._\+~#=]{2,256}\.[a-z\u0401\u0451\u0410-\u044f]{2,6}/i.test(value))
                    error = 'Некорректный URL адрес! Пример допустимых URL адресов: http://site.ru, https://мойсайт.рф';
                break;
            case 'amount':
                if (value.length > 50) error = 'Длина этого поля не должна превышать 50 символов!';
                else if (!/^\d*\.?\d*$/.test(value)) error = 'Введена некорректная сумма! Используйте только целые числа и числа с плавающей точкой.';
                break;
            case 'count_users':
                if (value.length > 50) error = 'Длина этого поля не должна превышать 50 символов!';
                else if (!/^\d+$/.test(value)) error = 'Введено некорректное количество пользователей! Используйте только целые числа.';
                break;
            case 'comments':
                if (value.length > 500) error = 'Длина этого поля не должна превышать 500 символов!';
                break;
            case 'contacts':
                if (!value) error = 'Поле контакты обязательно для заполнения!';
                else if (value.length > 250) error = 'Длина этого поля не должна превышать 250 символов!';
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: validateField(name, value)});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.current.show({
                severity: 'error',
                summary: 'Ошибка',
                detail: 'Пожалуйста, исправьте ошибки в форме.',
                life: 3000,
            });
            return;
        }

        try {
            const response = await axios.post('/wp-json/payway/v1/projects', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            });

            setFormData({
                url: '',
                amount: '',
                count_users: '',
                comments: '',
                contacts: '',
            });

            dispatch(showToast({
                message: 'Проект успешно отправлен на проверку!',
                severity: 'success',
            }));

            navigate('/projects');
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Ошибка',
                detail: error.response?.data?.message || 'Произошла ошибка при отправке формы.',
                life: 3000,
            });
        }
    };

    return (
        <div>
            <Toast ref={toast}/>

            <div className="mt-5 mb-5">
                Здесь можно добавить проекты, которые вы хотите монетизировать с помощью payway.store. Пожалуйста,
                заполняйте поля подробно, отвечая на все вопросы по вашему типу проекта.
            </div>

            <form onSubmit={handleSubmit} className="p-fluid">
                <div className="grid">
                    {/* Первая колонка */}
                    <div className="col-12 md:col-6">
                        <div className="field">
                            <label htmlFor="url">Ссылка на проект (обязательно)</label>
                            <InputText
                                id="url"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                className={classNames({'p-invalid': errors.url})}
                                placeholder="Пример: ваша-ссылка.ру"
                                required
                            />
                            {errors.url && <small className="p-error block">{errors.url}</small>}
                            <small className="p-text-secondary">Ссылка на ваш сайт, YouTube канал, приложение и
                                т.д.</small>
                        </div>

                        <div className="field">
                            <label htmlFor="amount">Оборот проекта в месяц (в долларах)</label>
                            <InputNumber
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onValueChange={(e) => handleChange({target: {name: 'amount', value: e.value}})}
                                className={classNames({'p-invalid': errors.amount})}
                                placeholder="Пример: 3000"
                                mode="currency"
                                currency="USD"
                                locale="ru-RU"
                            />
                            {errors.amount && <small className="p-error block">{errors.amount}</small>}
                            <small className="p-text-secondary">Была ли монетизация этого проекта? Если да, какой
                                примерно был оборот в месяц (в долларах).</small>
                        </div>

                        <div className="field">
                            <label htmlFor="contacts">Укажите, как с вами можно связаться? (обязательно)</label>
                            <InputText
                                id="contacts"
                                name="contacts"
                                value={formData.contacts}
                                onChange={handleChange}
                                className={classNames({'p-invalid': errors.contacts})}
                                placeholder="Telegram/Email"
                                required
                            />
                            {errors.contacts && <small className="p-error block">{errors.contacts}</small>}
                            <small className="p-text-secondary">
                                Быстрее всего мы ответим в Telegram, либо можете указать ваш email для связи.
                            </small>
                        </div>
                    </div>

                    {/* Вторая колонка */}
                    <div className="col-12 md:col-6">
                        <div className="field">
                            <label htmlFor="count-users">Какой у вас в среднем трафик в месяц?</label>
                            <InputText
                                id="count-users"
                                name="count_users"
                                value={formData.count_users}
                                onChange={handleChange}
                                className={classNames({'p-invalid': errors.count_users})}
                                placeholder="Пример: 550"
                            />
                            {errors.countUsers && <small className="p-error block">{errors.countUsers}</small>}
                            <small className="p-text-secondary">(для сайтов и приложений)</small>
                        </div>
                        <div className="field">
                            <label htmlFor="comments">На канале были какие-то нарушения, страйки, жалобы на авторское
                                право, какие-то иные проблемные моменты? (для YouTube каналов)</label>
                            <InputTextarea
                                id="comments"
                                name="comments"
                                value={formData.comments}
                                onChange={handleChange}
                                className={classNames({'p-invalid': errors.comments})}
                                placeholder="Ваш текст"
                                rows={6}
                            />
                            {errors.comments && <small className="p-error block">{errors.comments}</small>}
                            <small className="p-text-secondary">
                                Опишите, где вы берёте исходные материалы для ваших роликов (звук, видео, изображения)?
                                Какое основное ГЕО трафика? Какой источник трафика?
                            </small>
                        </div>
                    </div>
                </div>

                <Button type="submit" label="Создать проект"
                        className="mt-3 w-15rem bg-blue-500 hover:bg-blue-600 border-blue-600 hover:border-blue-700"/>
            </form>
        </div>
    );
};

export default ProjectsForm;