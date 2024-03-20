import { html, render } from "../lib.js"
import { createSubmitHandler } from "../util.js";

const registerTemplate = (onRegister) => html`
<section id="form-sign-up" class="view-section">
        <form @submit=${onRegister}
          id="register-form"
          class="text-center border border-light p-5">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              placeholder="Email"
              name="email"
              value=""
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              placeholder="Password"
              name="password"
              value=""
            />
          </div>

          <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input
              id="repeatPassword"
              type="password"
              class="form-control"
              placeholder="Repeat-Password"
              name="repeatPassword"
              value=""
            />
          </div>

          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </section>
`;

export function showRegister(ctx){
    render(registerTemplate(createSubmitHandler(onRegister)));
}

async function onRegister(data){

}