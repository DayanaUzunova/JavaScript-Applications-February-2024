import { html, render } from "../lib.js";

const homeTemplate = () => html`
<section id="home">
    <h1>Learn more about your favorite fruits</h1>
    <img
      src="./images/pexels-pixabay-161559-dImkWBDHz-transformed (1).png"
      alt="home"
    />
  </section>
`;

export function showHomeView(){
    render(homeTemplate());
}