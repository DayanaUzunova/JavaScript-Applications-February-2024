import { userHelper } from './utility/userHelper.js';
//тази функция може да е прайвът _requester и част 1 скелет
//step 2
async function requester(method, url, data) {
  const option = {
    method,
    headers: {},
  };

  //from step 5 getting the userToken
  const accessToken = userHelper.getUserToken();

  if (accessToken) {
    option.headers['x-authorization'] = accessToken;
  }

  if (data) {
    option.headers['Content-Type'] = 'application/json';
    option.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(url, option);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    if (response.status === 204) {
      return response;
    }

    return await response.json();
  } catch (error) {
    alert(error.message);
    throw new Error(error);
  }
}

async function get(url) {
  return requester('GET', url);
}
async function post(url, data) {
  return requester('POST', url, data);
}
async function put(url, data) {
  return requester('PUT', url, data);
}
async function del(url) {
  return requester('DELETE', url);
}
//step 3 userService
export const api = {
  get,
  put,
  post,
  del,
};
