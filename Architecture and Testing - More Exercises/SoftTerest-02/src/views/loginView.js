import { login } from "../api/userService.js";
import { setUser } from "../utils/userUtils.js";

const view = document.querySelector("div[data-view-name='login']");
const form = view.querySelector("form");
form.addEventListener("submit", onSubmit);

let context = null; 
export function showLoginView(ctx){
    context = ctx;
    context.render(view);
}

async function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const {email, password} = Object.fromEntries(formData);

    if(!email || !password){
        return alert("Error login");
    }

    const userData = await login({email, password});
    setUser(userData);
    context.updateNav();
    context.goTo("/home");
    form.reset();
}