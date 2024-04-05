import { html } from '../lib/lib.js';
import { createSubmitHandler } from '../utils/formHelper.js';
import { register } from '../data/users.js';

const registerTemplate = (onRegister) => html`
    <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form class="login-form" @submit=${onRegister}>
                <input type="text" name="email" id="register-email" placeholder="email" />
                <input type="password" name="password" id="register-password" placeholder="password" />
                <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    </section>
`;

export function showRegisterView(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister({ email, password, ['re-password']: rePass }, form) {
        if (!email) {
            return alert('Email is required.');
        } else if (!password) {
            return alert('Password is required.');
        } else if (password !== rePass) {
            return alert('Passwords must match.');
        }

        await register({ email, password });
        form.reset();
        // TODO: navigate to right page after register
        ctx.goTo('/');
    }
}
