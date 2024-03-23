import { clearUserData, getUserData } from '../util.js';

const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }


    try {
        const res = await fetch(host + url, options);

        if (!res.ok) {
            if (res.status == 403) {
                clearUserData();
            }

            const err = await res.json();
            throw new Error(err.message);
        }

        return res.json();
    } catch (err) {
        setTimeout(() => {
            if (!err.handled) {
                alert(err.message);
            }
        }, 1);

        throw err;
    }
}

export const get = (url) => request('get', url);
export const post = (url, data) => request('post', url, data);
export const put = (url, data) => request('put', url, data);
export const del = (url) => request('delete', url);

window.api = {
    get, post, put, del
};