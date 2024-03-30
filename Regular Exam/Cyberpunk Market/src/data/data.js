import { del, get, post, put } from "./request.js"

const endpoints = {
    allItems: "/data/cyberpunk?sortBy=_createdOn%20desc",
    item: '/data/cyberpunk'
}

export async function getAllItems(){
    return await get(endpoints.allItems);
}

export async function createItem(data){
    return await post(endpoints.item, data);
}

export async function getItemById(id){
    return await get(`${endpoints.item}/${id}`);
}

export async function delItem(id){
    return await del(`${endpoints.item}/${id}`);
}

export async function updateItem(id, data){
    return await put(`${endpoints.item}/${id}`, data);
}
