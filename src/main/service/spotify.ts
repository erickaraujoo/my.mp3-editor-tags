import { SPOTIFY } from './../config/constants';
import axios, { AxiosRequestConfig } from 'axios';
import TokenRepository from '../../infra/db/TokenRepository';
import TokenService from '../../infra/spotify/TokenService';

const api = axios.create({ baseURL: SPOTIFY.HOST_API });
const auth = axios.create({ baseURL: SPOTIFY.HOST_AUTH });

api.interceptors.request.use(
  async (request) => {
    const clientCredentials = `${SPOTIFY.CLIENT_ID}:${SPOTIFY.CLIENT_SECRET}`;

    const grantType = Buffer.from(clientCredentials).toString('base64');

    const lastToken = await TokenRepository.findLastToken();

    if (!lastToken) {
      const token = await TokenService.find(`Basic ${grantType}`);
      console.log({ token });
    }

    //   const token = await TokenService.find(grantType);

    //   console.log(token);
    // }

    request.headers.Authorization = `Bearer BQCdKH23973t90ZetWqnj9DCwZ7_jujHGIaa48ZCvpv5CRChyGt39YxphffZlBnFF9LRRnH7iAjYt4TIc6A`;
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
  find: (token: string) =>
    auth.post(
      '/token',
      { grant_type: 'client_credentials' },
      { headers: { 'content-type': 'application/x-www-form-urlencoded', Authorization: token } },
    ),
};
