import { register } from "../data/users.js";
import { html, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (handler) => html`
<section id="register">
      <div class="form">
        <h2>Register</h2>
        <form @submit=${handler} class="register-form">
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

export function showRegisterView(){
    const handler = createSubmitHandler(onSubmit);
    render(registerTemplate(handler));
}

async function onSubmit(data, form){
    if(!data.email || !data.password || data.password != data["re-password"]){
        return alert("error");
    }
    register(data.email, data.password);
}