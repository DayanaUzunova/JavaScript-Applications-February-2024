import { html, render } from '../lib.js'
import { register } from '../data/user.js'
import { createSubmitHandler } from '../utils.js'

const registerTemplate = (onRegister) => html`
<section id="register">
      <div class="form">
        <h2>Register</h2>
        <form @submit=${onRegister} class="register-form">
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
          <p class="message">Already registered? <a href="#">Login</a></p>
        </form>
      </div>
    </section>                                                    
`

export function showRegister({ email, password }, form) {
  render(registerTemplate(createSubmitHandler(onRegister)))
}

async function onRegister(data, form) {
  if (!data.email || !data.password || data.password !== data["re-password"]) {
    return alert('Error')
  }
  register(data.email, data.password)
}