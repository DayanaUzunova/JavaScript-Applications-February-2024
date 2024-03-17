import { getMovies } from "../data/movies.js";
import { html, render } from "../lit.js";

const homeTemplate = (movies) => html`
<h1>Movies Home</h1>
<p>Welcome to Movies</p>
<ul>
    ${movies.map(moviePreview)}
</ul>
`;

const moviePreview = movie => html`
<li>
    <a href="/details/${movie._id}">${movie.title}</a>
</li>
`
export async function showHome(){
    const movies = await getMovies();
    console.log(movies);
    render(homeTemplate(movies));
}