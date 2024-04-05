const userItem = 'userData';

export const getUserData = () => JSON.parse(sessionStorage.getItem(userItem));

export const setUserData = (data) => {
    sessionStorage.setItem(userItem, JSON.stringify(data));
};

export const clearUserData = () => {
    sessionStorage.removeItem(userItem);
};

export const getUserId = () => getUserData()?._id;
