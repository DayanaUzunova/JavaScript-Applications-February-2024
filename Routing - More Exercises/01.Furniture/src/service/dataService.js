import { api } from '../requester.js';
//step 4 dataService
const BASE_URL = 'http://localhost:3030/data';
const endpoints = {
  myFurniture: (userId) => `/catalog?where=_ownerId%3D%22${userId}%22`,
  furniture: '/catalog',
};
async function createFurniture(data) {
  return await api.post(BASE_URL + endpoints.furniture, data);
}
async function getAllFurniture() {
  return await api.get(BASE_URL + endpoints.furniture);
}
async function getFurnitureDetails(id) {
  return await api.get(BASE_URL + endpoints.furniture + `/${id}`);
}
async function updateFurniture(id, data) {
  return await api.put(BASE_URL + endpoints.furniture + `/${id}`, data);
}
async function delFurniture(id) {
  return await api.del(BASE_URL + endpoints.furniture + `/${id}`);
}
async function getMyFurniture(userId) {
  return await api.get(BASE_URL + endpoints.myFurniture(userId));
}

// step 5 userHelper/utility folder
export const dataService = {
  createFurniture,
  getAllFurniture,
  getFurnitureDetails,
  delFurniture,
  getMyFurniture,
  updateFurniture,
};
