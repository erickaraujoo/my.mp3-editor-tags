import 'dotenv/config';

export const SERVER = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
};

export const DATABASE = {
  DB_NAME: process.env.DB_NAME || '',
  DB_DIALECT: process.env.DB_DIALECT || 'mysql',
  DB_HOST: process.env.DB_HOST || '',
  DB_USERNAME: process.env.DB_USERNAME || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
};

export const LINK = {
  BASE_URL_IMAGE: process.env.BASE_URL_IMAGE,
};

export const CONFIG = {
  USER: 'Users/win',
  PATH: 'Music/editor-tag',
  LOCAL_DISK: 'C:',
  FORMAT: 'mp3',
  RESOLUTION: '800x8  00'
}

export const SPOTIFY = {
  HOST: process.env.HOST,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
}