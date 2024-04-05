import { html } from '../lib/lib.js';
import { createSubmitHandler } from '../utils/formHelper.js';
import { login } from '../data/users.js';

const loginTemplate = (onLogin) => html`
    <section id="login">
        <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onLogin}>
                <input type="text" name="email" id="email" placeholder="email" />
                <input type="password" name="password" id="password" placeholder="password" />
                <button type="submit">login</button>
                <p class="message">Not registered? <a href="/register">Create an account</a></p>
            </form>
        </div>
    </section>
`;

export function showLoginView(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    async function onLogin({ email, password }, form) {
        if (!email) {
            return alert('Email is required.');
        } else if (!password) {
            return alert('Password is required.');
        }

        await login({ email, password });
        form.reset();
        // TODO: navigate to right page after login
        ctx.goTo('/');
    }
}
