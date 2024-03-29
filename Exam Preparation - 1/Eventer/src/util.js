export function setUserData(data) {
    localStorage.setItem('user', JSON.stringify(data))
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}

export function clearUserData() {
    localStorage.removeItem('user'); 
}

//TODO Add custom validation if needed

export function createSubmitHandler(callback) {
    return function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = [...formData.entries()].map(([k, v]) => [k, v.trim()]);

        callback(Object.fromEntries(data), event.target);
    }
}

export function updateNav() {
    const userData = getUserData();

    document.querySelector('nav .guest').style.display = userData ? 'none' : 'block';
    document.querySelector('nav .user').style.display = userData ? 'block' : 'none ';
}