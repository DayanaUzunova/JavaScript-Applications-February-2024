import { del, get, post, put } from "./requests.js"
import { page } from "../lib.js"

const endPoints = {
    allCatalog: '/data/motorcycles?sortBy=_createdOn%20desc',
    create: '/data/motorcycles',
}

export async function getAllCatalog(){
   return await get(endPoints.allCatalog)
}

export async function createModel(data){
    return await post(endPoints.create, data)
}

export async function detailsModel(id){
  return await get(`${endPoints.create}/${id}`)
}

export async function deleteModel(id){
    return await del(`${endPoints.create}/${id}`);
    page.redirect('/dashboard');
}

export async function updataModel(id,data){
    return await put(`${endPoints.create}/${id}`,data)
}

export async function searchModel(query){
return await get(`/data/motorcycles?where=model%20LIKE%20%22${query}%22`)
}