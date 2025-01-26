import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Message} from "primereact/message";

export default function EditProfile() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
    });
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.repeatPassword) {
            alert("Пароли не совпадают");
            return;
        }

        setSuccessMessage("Данные успешно сохранены!");
        console.log("Отправлено:", formData);

        setFormData({
            name: "",
            email: "",
            password: "",
            repeatPassword: "",
        });
    };

    return (
        <div>
            {successMessage && (
                <Message
                    severity="success"
                    text={successMessage}
                    className="mb-4"
                />
            )}
            <form
                id="payway-edit-profile-form"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <div className="grid formgrid">
                    <div className="col-12 mb-4">
                        <label htmlFor="name" className="block mb-2">
                            Имя (Обязательно)
                        </label>
                        <InputText
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ваше имя"
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="col-12 mb-4">
                        <label htmlFor="email" className="block mb-2">
                            Почта (Обязательно)
                        </label>
                        <InputText
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Ваш email"
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="col-12 mb-4">
                        <label htmlFor="password" className="block mb-2">
                            Новый пароль
                        </label>
                        <Password
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            toggleMask
                            feedback={false}
                            className="w-full"
                        />
                    </div>

                    <div className="col-12 mb-4">
                        <label htmlFor="repeatPassword" className="block mb-2">
                            Повторите пароль
                        </label>
                        <Password
                            id="repeatPassword"
                            name="repeatPassword"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            toggleMask
                            feedback={false}
                            className="w-full"
                        />
                    </div>

                    <div className="col-12 mt-3">
                        <Button
                            label="Сохранить данные"
                            icon="pi pi-save"
                            type="submit"
                            className="p-button-success w-full"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}