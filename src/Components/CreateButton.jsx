import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function CreateButton({ label, to }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to); // Переход на страницу, переданную в `to`
    };

    return (
        <Button
            type="submit"
            label={label} // Текст кнопки, переданный в `label`
            className="bg-blue-500 hover:bg-blue-600 border-blue-600 hover:border-blue-700"
            size="small"
            onClick={handleClick}
        />
    );
}