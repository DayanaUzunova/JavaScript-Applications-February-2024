import { clearUserData, getUserData } from "../util.js";

const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {

        const response = await fetch(host + url, options);

        if (!response.ok) {
            if(response.status == 403){
                clearUserData();
            }
            const err = await response.json();
            throw new Error(err.message);
        }

        if(response.status == 204){
            return response;
        }
        else {
            return response.json();
        }

    } catch (err) {
        //TODO add custom error handling and vizualization based on the exam
        alert(err.message);
        throw err;
    }
}

export const get = (url) => request('GET', url);
export const post = (url, data) => request('POST', url, data);
export const put = (url, data) => request('PUT', url, data);
export const del = (url) => request('DELETE', url);