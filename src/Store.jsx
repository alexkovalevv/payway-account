import {configureStore} from '@reduxjs/toolkit';
import toastReducer from './toastSlice'; // Создадим этот файл позже

export const Store = configureStore({
    reducer: {
        toast: toastReducer, // Регистрируем reducer для управления сообщениями
    },
});