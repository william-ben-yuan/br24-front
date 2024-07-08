import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        });

        if (response.data.access_token) {
            localStorage.setItem('user', JSON.stringify(response.data.access_token));
        }

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

export default {
    login,
    logout
};