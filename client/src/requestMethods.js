import axios from 'axios';

const BASE_URL = "http://localhost:3001";

const appUrl = BASE_URL;

export const publicRequest = axios.create({
    baseURL: `${appUrl}/api`,
});