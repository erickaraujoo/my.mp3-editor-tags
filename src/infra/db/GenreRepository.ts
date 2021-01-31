import { GenreSpotifyEntity } from './../../domain/entities/spotify/genre/GenreSpotifyEntity';
import knex from './../../config/database';
import Knex from 'knex';

class GenreRepository {
  static async findByName(genreName: string) {
    return knex('tb_genre').select('genre_id as id', 'genre_name as name').where({ genre_name: genreName }).first();
  }

  static async create(genreName: string, trx: Knex.Transaction) {
    return knex('tb_genre').transacting(trx).insert({ genre_name: genreName });
  }
}

export default GenreRepository;
