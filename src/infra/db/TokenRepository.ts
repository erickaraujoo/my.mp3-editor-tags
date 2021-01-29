import { TokenSpotifyEntity } from './../../domain/entities/spotify/token/TokenSpotifyEntity';
import Knex from 'knex';
import knex from '../../config/database';

class TokenRepository {
  static async findLastToken() {
    return knex('tb_token').select().orderBy('token_id', 'desc').first();
  }

  static async create(token: TokenSpotifyEntity) {
    return knex('tb_token').insert({ token });
  }
}

export default TokenRepository;