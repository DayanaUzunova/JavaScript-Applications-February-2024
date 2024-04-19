import { del, get, post, put } from "./api.js";

const host = 'http://localhost:3030';

const endpoints = {
    getAll: `/data/cars?sortBy=_createdOn%20desc`,
    create: '/data/cars',
    update: (id) => `/data/cars/${id}`,
    delete: (id) => `/data/cars/${id}`,
    getById: (id) => `/data/cars/${id}`,
    getAllByName: (name) => `/data/cars?where=model%20LIKE%20%22${name}%22`
};

export const getAllCars = () => {
    return get(host + endpoints.getAll);
}

export const createCar = (model, imageUrl, price, weight, speed, about) => {
    return post(host + endpoints.create, { model, imageUrl, price, weight, speed, about });
}

export const updateCar = (id, model, imageUrl, price, weight, speed, about) => {
    return put(host + endpoints.update(id), { model, imageUrl, price, weight, speed, about });
}

export const deleteCar = (id) => {
    return del(host + endpoints.delete(id));
}

export const getCarById = (id) => {
    return get(host + endpoints.getById(id));
}

export const getCarsByName = (name) => {
    return get(host + endpoints.getAllByName(name));
}