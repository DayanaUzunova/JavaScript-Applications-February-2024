import { get } from "../data/request.js";

const host = 'http://localhost:3030/data/movies';

export async function getMovies(){
    return get(host);
}