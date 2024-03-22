//step 11
import { html } from '../../node_modules/lit-html/lit-html.js';
import { userService } from '../service/userService.js';
import { userHelper } from '../utility/userHelper.js';

const loginTemp = (data) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Login User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onLogin}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="email">Email</label>
          <input class="form-control" id="email" type="text" name="email" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="password">Password</label>
          <input class="form-control" id="password" type="password" name="password" />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </div>
    </div>
  </form>
`;
let context = null;
export function showLoginView(ctx) {
  context = ctx;
  context.render(loginTemp());
}
//step 11 just follow registerView
async function onLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);
  
  if (!email || !password) {
    return alert('Error login');
  }
  const userData = await userService.login({ email, password });
  userHelper.setUserData(userData);
  context.updateNav();
  context.goTo('/dashboard');
}
