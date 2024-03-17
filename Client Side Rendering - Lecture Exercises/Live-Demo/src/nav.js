import { showHome } from "./views/home.js";
import { showRegister } from "./views/register.js";

const views = {
    'home': showHome,
    'register': showRegister
}

export function onNavigate(event){
    if(event.target.tagName == 'A'){
        event.preventDefault();
        visit(event.target.id);
    }
}

export function visit(id){
    const view = views[id];
    view();
}