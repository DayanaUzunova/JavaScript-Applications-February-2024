import { clearUserData, getUserData } from '../utils/userHelper.js';

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status === 403) {
                //user session has expired
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            //logout - no content
            return response;
        }

        const data = await response.json();

        return data;
    } catch (error) {
        // alert only if notification is not handled in the location of occuring
        setTimeout(() => {
            if (!error.handled) {
                alert(error.message);
            }
        }, 1);
        throw error;
    }
}

function createOptions(method = 'GET', data) {
    const options = {
        method,
        headers: {},
    };

    const userData = getUserData();
    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;
}

export const get = (url) => request(url, createOptions());
export const post = (url, data) => request(url, createOptions('POST', data));
export const put = (url, data) => request(url, createOptions('PUT', data));
export const del = (url) => request(url, createOptions('DELETE'));
