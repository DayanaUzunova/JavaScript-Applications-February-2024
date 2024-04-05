import { del, get, post, put } from './api.js';

const host = 'http://localhost:3030';

const endpoints = {
    allAlbums: '/data/albums?sortBy=_createdOn%20desc',
    albums: '/data/albums',
    albumlById: (id) => `/data/albums/${id}`,
    likes: '/data/likes',
    allAllbumLikes: (albumId) => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    userAlbumLikes: (userId, albumId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export const getAllAlbums = async () => {
    return await get(host + endpoints.allAlbums);
};

export const getAlbumById = async (albumId) => {
    return await get(host + endpoints.albumlById(albumId));
};

export const createAlbum = async (data) => {
    return await post(host + endpoints.albums, data);
};

export const editAlbum = async (albumId, data) => {
    return await put(host + endpoints.albumlById(albumId), data);
};

export const deleteAlbum = async (albumId) => {
    return await del(host + endpoints.albumlById(albumId));
};

export const getAllAlbumLikes = async (albumId) => {
    return await get(host + endpoints.allAllbumLikes(albumId));
};

export const addLike = async (albumId) => {
    return await post(host + endpoints.likes, { albumId });
};

export const hasUserLikedAlbum = async (userId, albumId) => {
    const res = await get(host + endpoints.userAlbumLikes(userId, albumId));
    return Boolean(res);
};
