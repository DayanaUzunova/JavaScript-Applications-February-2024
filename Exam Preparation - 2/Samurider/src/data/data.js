import { del, get, post, put } from "./request.js"

const endpoints = {
    allMotorcycles: "/data/motorcycles?sortBy=_createdOn%20desc",
    motorcycle: '/data/motorcycles'
}

export async function getAllMotorcycles(){
    return await get(endpoints.allMotorcycles);
}

export async function createMotor(data){
    return await post(endpoints.motorcycle, data);
}

export async function getMotorById(id){
    return await get(`${endpoints.motorcycle}/${id}`);
}

export async function delMotor(id){
    return await del(`${endpoints.motorcycle}/${id}`);
}

export async function updateMotor(id, data){
    return await put(`${endpoints.motorcycle}/${id}`, data);
}

export async function searchByQuery(query){
    return await get(`/data/motorcycles?where=model%20LIKE%20%22${query}%22`)
}