import { getMovieById } from "../data/movies.js";
import { render, html } from "../lib.js";
import { loading } from "./partials.js";

const detailsTemplate = (movie) => html`
<section id="movie-example" class="view-section">
        <div class="container">
          <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
              <img
                class="img-thumbnail"
                src="${movie.img}"
                alt="Movie"
              />
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>
                ${movie.description}
              </p>
              <a class="btn btn-danger" href="#">Delete</a>
              <a class="btn btn-warning" href="#">Edit</a>
              <a class="btn btn-primary" href="#">Like</a>
              <span class="enrolled-span">Liked 1</span>
            </div>
          </div>
        </div>
      </section>
`;
export async function showDetails(ctx){
    render(loading());
    const movieId = ctx.params.id;
    const movie = await getMovieById(movieId);
    render(detailsTemplate(movie));
}