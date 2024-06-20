// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000', // Your backend API URL
});

export default instance;
