import { get } from "./api.js";

export async function getMovies(){
    return get('/data/movies');
}

export async function getMovieById(id){
    return get('/data/movies/' + id);
}