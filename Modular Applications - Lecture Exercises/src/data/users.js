import { saveUserData } from '../util.js';
import { get, post } from './api.js';

export async function register(email, password) {
    const result = await post('/users/register', { email, password });
    saveUserData(result);
}

export async function login(email, password) {
    const result = await post('/users/login', { email, password });
    saveUserData(result);
}

window.login = login;