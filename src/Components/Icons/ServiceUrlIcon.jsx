import React from 'react';

export const ServiceUrlIcon = ({url}) => {
    const getServiceIcon = (url) => {
        // Проверка на YouTube
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:@[^\/\n\s]+|[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)/;

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

    return getServiceIcon(url);
};
