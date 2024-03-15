import { logout } from "./src/api/userService.js";
import { hasUser, removeUser } from "./src/utils/userUtils.js";
import { showCreateView } from "./src/views/createView.js";
import { showDashboardView } from "./src/views/dashboardView.js";
import { showDetailsView } from "./src/views/detailsView.js";
import { showHomeView } from "./src/views/homeView.js";
import { showLoginView } from "./src/views/loginView.js";
import { showRegisterView } from "./src/views/registerView.js";


document.querySelectorAll("div[data-selection='section']").forEach(div => div.remove());

const main = document.querySelector("main");
const nav = document.querySelector("nav");
nav.addEventListener("click", onNavigate);

updateNav(); 

const routes = {
    "/": showHomeView,
    "/home": showHomeView,
    "/dashboard": showDashboardView,
    "/create": showCreateView,
    "/logout": async () => {
        await logout();
        removeUser();
        updateNav();
        goTo("/home");
    },
    "/login": showLoginView,
    "/register": showRegisterView,
    "/details": showDetailsView,
    "*": () => console.log("404 Page not found")
};

function updateNav(){
    const isUserExists = hasUser();
    const guestA = document.querySelectorAll("a[data-permission='guest']");
    const userA = document.querySelectorAll("a[data-permission='user']");

    if(isUserExists){
        guestA.forEach(a => a.style.display = "none");
        userA.forEach(a => a.style.display = "block");
    }
    else {
        guestA.forEach(a => a.style.display = "block");
        userA.forEach(a => a.style.display = "none");
    }

}

function renderer(view){
    main.replaceChildren(view);

}

function onNavigate(e){
    e.preventDefault();
    let element = e.target;
    
    if(e.target.tagName !== "A" && e.target.tagName !== "IMG"){
        return;
    }

    if(e.target.tagName == "IMG"){
        element = e.target.parentElement;
    }
    const viewName = new URL(element.href).pathname;
    goTo(viewName);
}

let ctx = {
    render: renderer,
    goTo,
    updateNav
}

function goTo(name, ...params){
    const handler = routes[name];
    if(typeof(handler) !== "function"){
        return routes["*"]();
    }
    handler(ctx, params);
}

goTo("/home");