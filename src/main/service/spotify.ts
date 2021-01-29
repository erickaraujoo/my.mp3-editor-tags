import { SPOTIFY } from './../config/constants';
import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({ baseURL: SPOTIFY.HOST });

api.interceptors.request.use(async (request) => {
  request.headers.Authorization = `Bearer BQAZY-3RgDr6aVV3hA5QIh5RqR_IaMQExua-68NX2rnEa7NMJ3sE2hF83m6i9mF7Bl74zOhB380ER5x9HzE`;
  return request;
}, (error) => Promise.reject(error));

export const search = {
  find: (query: AxiosRequestConfig) => api.get('/search', { params: query }),
}

export const artist = {
  find: (artistSpotifyId: string) => api.get(`/artists/${artistSpotifyId}`),
}

export const album = {
  find: (albumSpotifyId: string) => api.get(`/albums/${albumSpotifyId}`),
}

export const genre = {}

export const track = {
  find: (trackId: string) => api.get(`/tracks/${trackId}`),
}