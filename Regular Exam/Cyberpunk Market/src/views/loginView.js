import { login } from "../data/users.js";
import { html, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const loginTemplate = (handler) => html`
<section id="login">
    <div class="form">
      <h2>Login</h2>
      <form @submit=${handler} class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  </section>
`;

export function showLoginView(){
    const handler = createSubmitHandler(onSubmit);
    render(loginTemplate(handler));
}

function onSubmit(data, form){
    const {email, password} = data;

    if(!email || !password){
        return alert('Error!');
    }
    login(email, password);
}