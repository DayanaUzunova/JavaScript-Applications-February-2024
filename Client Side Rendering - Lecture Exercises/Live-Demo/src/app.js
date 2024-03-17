import { onNavigate, visit } from "./nav.js";

document.querySelector('nav').addEventListener('click', onNavigate);

visit('home');