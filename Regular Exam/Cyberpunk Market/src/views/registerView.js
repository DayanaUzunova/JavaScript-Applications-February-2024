import { register } from "../data/users.js";
import { html, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (onRegisterBtn) => html`
<section id="register">
    <div class="form">
      <h2>Register</h2>
      <form @submit=${onRegisterBtn} class="register-form">
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`;

export function showRegisterView({ email, password }, form){
  render(registerTemplate(createSubmitHandler(onRegisterBtn)))
}

async function onRegisterBtn(data, form) {
  if (!data.email || !data.password) {
    return alert("Error");
  }

  const trimmedPassword = data.password.trim();
  const trimmedRePassword = data["re-password"].trim();

  if (trimmedPassword !== trimmedRePassword) {
    const error = "Passwords don't match";
    return alert(error);
  }

  register(data.email, trimmedPassword);
}