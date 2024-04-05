import { clearUserData, setUserData } from '../utils/userHelper.js';
import { get, post } from './api.js';

const host = 'http://localhost:3030';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
};

export const login = async (data) => {
    const responseData = await post(host + endpoints.login, data);
    setUserData(responseData);
};

export const register = async (data) => {
    const responseData = await post(host + endpoints.register, data);
    setUserData(responseData);
};

export const logout = async () => {
    const response = get(host + endpoints.logout);
    clearUserData();
    await response;
};
