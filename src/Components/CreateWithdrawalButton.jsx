import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "primereact/button";

export default function CreateWithdrawalButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/create-withdrawal');
    };

    return (
        <Button
            type="submit"
            label="Создать заявку"
            className="bg-blue-500 hover:bg-blue-600 border-blue-600 hover:border-blue-700"
            size="small"
            onClick={handleClick}
        />
    );
}