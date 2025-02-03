import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from './AuthContext'; // Используем контекст

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuth(); // Получаем состояние авторизации

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};

export default ProtectedRoute;