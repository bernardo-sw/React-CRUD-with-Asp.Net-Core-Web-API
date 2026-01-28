import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44396',
});

export default api;