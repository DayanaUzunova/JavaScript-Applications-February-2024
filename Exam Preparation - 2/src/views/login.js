import { html , render, page } from '../lib.js'
import { createSubmitHandler } from '../utils.js'
import { login } from '../data/user.js'

const loginTemplate = (onLogin) => html`
   <section id="login">
      <div class="form">
        <h2>Login</h2>
        <form @submit=${onLogin} class="login-form">
          <input type="text" name="email" id="email" placeholder="email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <button type="submit">login</button>
          <p class="message">
            Not registered? <a href="#">Create an account</a>
          </p>
        </form>
      </div>
    </section>
`

export function showLogin(ctx){
    render(loginTemplate(createSubmitHandler(onLogin)))
}

async function onLogin(data, form){
  const {email, password} = data
    if(!email || !password ){
        return alert('Error')
    }

    login(email, password);
}