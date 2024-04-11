import { clearUserData, getUserData } from "../util.js";

async function request(method, url, data) {

    const options = {
        method,
        headers: {}
    };

    if (data) {
        options.headers = {
            'Content-Type': 'application/json'
        };
        options.body = JSON.stringify(data);
    }

    let userData = getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.json();

            if (userData && response.status == 403) {
                clearUserData();
            }
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return;
        }

        return response.json();

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export const get = (url) => request('GET', url);
export const post = (url, data) => request('POST', url, data);
export const put = (url, data) => request('PUT', url, data);
export const del = (url) => request('DELETE', url);