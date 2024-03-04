start();

function start() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', onLogin);
}

async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const email = data.email.trim();
    const password = data.password.trim();

    const url = 'http://localhost:3030/users/login';

    try {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }

        const userData = await res.text();
        localStorage.setItem('user', userData);

        window.location = '/';
    } catch (err) {
        alert(err.message);
    }
}