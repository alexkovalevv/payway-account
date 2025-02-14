import React, {useState, useEffect} from 'react';
import {Skeleton} from 'primereact/skeleton'; // Для отображения лоадера

const ServiceTitle = ({url}) => {
    const [title, setTitle] = useState(null);
    const [loading, setLoading] = useState(true);

    // Функция для получения иконки сервиса
    const getServiceIcon = (url) => {
        // Проверка на YouTube
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:@[^\/\n\s]+|[^\/\n\s]+\/\S+\/|(?:v|embed)\/|\S*?[?&]v=)|youtu\.be\/)/;
        if (youtubeRegex.test(url)) {
            return <i className="pi pi-youtube" style={{color: 'red'}}></i>;
        }

        // Проверка на Google Play
        const googlePlayRegex = /https?:\/\/play\.google\.com\/store/;
        if (googlePlayRegex.test(url)) {
            return <i className="pi pi-google" style={{color: '#4285F4'}}></i>;
        }

        // Дефолтная иконка веб-сайта
        return <i className="pi pi-globe" style={{color: '#666'}}></i>;
    };

    // Функция для получения заголовка страницы
    useEffect(() => {
        const fetchTitle = async () => {
            try {
                // Проверяем, есть ли данные в локальном хранилище
                const cachedTitle = localStorage.getItem(url);
                if (cachedTitle) {
                    setTitle(cachedTitle);
                    setLoading(false);
                    return;
                }

                // Формируем корректный URL для YouTube-каналов
                let targetUrl = url;
                if (url.startsWith('@')) {
                    targetUrl = `https://www.youtube.com/${url}`;
                }

                // Делаем запрос на сервер для получения заголовка
                const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
                const data = await response.json();
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.contents, 'text/html');
                const pageTitle = doc.querySelector('title')?.textContent || url;

                // Кешируем результат в локальное хранилище
                localStorage.setItem(url, pageTitle);
                setTitle(pageTitle);
            } catch (error) {
                console.error('Ошибка при получении заголовка:', error);
                setTitle(url); // В случае ошибки возвращаем исходный URL
            } finally {
                setLoading(false);
            }
        };

        fetchTitle();
    }, [url]);

    return (
        <div className="flex align-items-center">
            {loading ? (
                <Skeleton width="10rem" height="1rem"/> // Лоадер
            ) : (
                <>
                    {getServiceIcon(url)} {/* Иконка сервиса */}
                    <a href={url} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm">
                        {title}
                    </a>
                </>
            )}
        </div>
    );
};

export default ServiceTitle;