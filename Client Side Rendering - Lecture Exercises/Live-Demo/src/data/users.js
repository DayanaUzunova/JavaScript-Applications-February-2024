import { post } from "../data/request.js";

const host = 'http://localhost:3030/users';

export async function register(email, password){
    return post(host + '/register', { email, password });
}