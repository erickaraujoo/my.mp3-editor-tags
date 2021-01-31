import { validateSpotifyToken, timer } from './../utils/index';
import { SPOTIFY, AXIOS } from './../config/constants';
import axios, { AxiosRequestConfig } from 'axios';
import TokenRepository from '../../infra/db/TokenRepository';
import TokenService from '../../infra/spotify/TokenService';

const api = axios.create({ baseURL: SPOTIFY.HOST_API });
const auth = axios.create({ baseURL: SPOTIFY.HOST_AUTH });

api.interceptors.request.use(
  async (request) => {
    const clientCredentials = `${SPOTIFY.CLIENT_ID}:${SPOTIFY.CLIENT_SECRET}`;

    const authorization = Buffer.from(clientCredentials).toString('base64');

    const lastToken = await TokenRepository.findLastToken();

    const lastTokenTimestamp = lastToken ? new Date(lastToken.created_at).getTime() : null;

    const validate = validateSpotifyToken(lastTokenTimestamp);

    if (!lastToken || !validate) {
      const { data } = await TokenService.find(`Basic ${authorization}`);

      await TokenRepository.create(data.access_token);

      request.headers.Authorization = `Bearer ${data.access_token}`;
      return request;
    }

    request.headers.Authorization = `Bearer ${lastToken.token}`;
    return request;
  },
  (error) => Promise.reject(error),
);

export const search = {
  find: (query: AxiosRequestConfig) => api.get('/search', { params: query }),
};

export const artist = {
  find: (artistSpotifyId: string) => api.get(`/artists/${artistSpotifyId}`),
};

export const album = {
  find: (albumSpotifyId: string) => api.get(`/albums/${albumSpotifyId}`),
};

export const genre = {};

export const track = {
  find: (trackId: string) => api.get(`/tracks/${trackId}`),
};

export const token = {
  find: (authorization: string) =>
    auth.post('/token', SPOTIFY.GRANT_TYPE, {
      headers: { 'content-type': AXIOS.CONTENT_TYPE.URLENCODED, authorization },
    }),
};
