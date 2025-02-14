import React, {useState, useRef, useEffect} from 'react';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import {Checkbox} from 'primereact/checkbox';
import {useNavigate} from 'react-router-dom';
import Logo from "../Components/Icons/Logo";
import {createGlobalStyle} from "styled-components";
import {useAuth} from '../AuthContext';
import {registerUser, loginUser} from '../Api';
import {CheckIcon} from 'primereact/icons/check';

// Глобальные стили
const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }

    .p-icon-field {
        width: 100% !important;
        display: block !important;
    }

    .auth-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: flex-end; /* Форма справа */
        padding-right: 10%; /* Отступ справа */
        position: relative;
        overflow: hidden;
    }

    .auth-page::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('https://payway.store/wp-content/uploads/2025/01/home-3-2-scaled.jpg');
        background-size: cover;
        background-position: center;
        transform: scaleX(-1); /* Зеркальное отражение */
        /* z-index: -1;*/
    }

    .auth-form-container {
        background: rgba(255, 255, 255, 0.9); /* Полупрозрачный белый фон для формы */
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 450px;
        position: relative;
        z-index: 1;
    }

    .p-password-match {
        color: green;
    }

    .p-checkbox-label {
        margin-left: 0.5rem;
    }

    .p-checkbox-link {
        color: #3D73FF;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const AuthForm = () => {
    const {isAuthenticated, login} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false); // Согласие с пользовательским соглашением
    const [agreePrivacy, setAgreePrivacy] = useState(false); // Согласие на обработку персональных данных
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/account');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegistering) {
            if (password !== confirmPassword) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: 'Пароли не совпадают',
                    life: 3000,
                });
                return;
            }

            if (!agreeTerms || !agreePrivacy) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: 'Необходимо согласиться с условиями',
                    life: 3000,
                });
                return;
            }
        }

        try {
            if (isRegistering) {
                await registerUser(email, password);
                toast.current.show({
                    severity: 'success',
                    summary: 'Успешно',
                    detail: 'Регистрация прошла успешно!',
                    life: 3000,
                });
                setIsRegistering(false); // Переключаем обратно на форму входа
            } else {
                const response = await loginUser(email, password);
                login(response.token);
                toast.current.show({
                    severity: 'success',
                    summary: 'Успешно',
                    detail: 'Вы успешно авторизовались!',
                    life: 3000,
                });
                navigate('/account');
            }
        } catch (err) {
            handleError(err);
        }
    };

    const handleError = (err) => {
        if (err.response && err.response.data) {
            const errorData = err.response.data;
            toast.current.show({
                severity: 'error',
                summary: 'Ошибка',
                detail: errorData.message || 'Произошла ошибка',
                life: 3000,
            });
        } else {
            toast.current.show({
                severity: 'error',
                summary: 'Ошибка соединения',
                detail: 'Сервер недоступен. Попробуйте позже.',
                life: 3000,
            });
        }
    };

    const isPasswordMatch = password === confirmPassword;

    return (
        <>
            <GlobalStyle/>
            <div className="auth-page">
                <Toast ref={toast}/>
                <div className="auth-form-container">
                    <div className="text-center mb-5">
                        <Logo width={150} height={70} fill="#3D73FF" className="mb-3"/>
                        <div className="text-500 text-3xl font-medium mb-3">
                            {isRegistering ? 'Регистрация аккаунта' : 'Вход в личный кабинет'}
                        </div>
                        <span className="text-600 font-medium line-height-3">
                            {isRegistering ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}
                        </span>
                        <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                           onClick={() => setIsRegistering(!isRegistering)}>
                            {isRegistering ? 'Войти' : 'Зарегистрируйтесь!'}
                        </a>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-900 font-medium mb-2">
                                Email
                            </label>
                            <InputText
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Введите email"
                                className="w-full"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="block text-900 font-medium mb-2">
                                Пароль
                            </label>
                            <Password
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Введите пароль"
                                className="w-full"
                                inputClassName="w-full"
                                feedback={false}
                                required
                            />
                        </div>

                        {isRegistering && (
                            <>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="block text-900 font-medium mb-2">
                                        Повторите пароль
                                    </label>
                                    <div className="p-inputgroup">
                                        <Password
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Повторите пароль"
                                            className="w-full"
                                            inputClassName="w-full"
                                            feedback={false}
                                            required
                                        />
                                        {isPasswordMatch && confirmPassword && (
                                            <span className="p-inputgroup-addon p-password-match">
                                                <CheckIcon/>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-3 flex align-items-center text-sm">
                                    <Checkbox
                                        inputId="agreeTerms"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.checked)}
                                        required
                                    />
                                    <label htmlFor="agreeTerms" className="p-checkbox-label">
                                        Я прочитал(а){' '}
                                        <a href="/terms" className="p-checkbox-link">
                                            пользовательское соглашение
                                        </a>{' '}
                                        и{' '}
                                        <a href="/privacy" className="p-checkbox-link">
                                            политику конфиденциальности
                                        </a>
                                    </label>
                                </div>

                                <div className="mb-3 flex align-items-center text-sm">
                                    <Checkbox
                                        inputId="agreePrivacy"
                                        checked={agreePrivacy}
                                        onChange={(e) => setAgreePrivacy(e.checked)}
                                        required
                                    />
                                    <label htmlFor="agreePrivacy" className="p-checkbox-label">
                                        Я согласен на{' '}
                                        <a href="/data-processing" className="p-checkbox-link">
                                            обработку персональных данных
                                        </a>
                                    </label>
                                </div>
                            </>
                        )}

                        <Button type="submit"
                                className="p-button p-component w-full mt-3 bg-blue-500 hover:bg-blue-600">
                            <span className="p-button-icon p-c p-button-icon-left pi pi-user"></span>
                            <span className="p-button-label p-c">{isRegistering ? 'Зарегистрироваться' : 'Войти'}</span>
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AuthForm;