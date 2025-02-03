import axios from 'axios';

const API_BASE_URL = '/wp-json';

export const registerUser = async (email, password, repassword) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, {
            email,
            password,
            repassword
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/jwt-auth/v1/token`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};