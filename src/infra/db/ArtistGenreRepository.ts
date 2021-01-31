import Knex from 'knex';
import knex from './../../config/database';

class ArtistGenreRepository {
  static async create(artistId: number, genreId: number, trx: Knex.Transaction) {
    return knex('tb_rel_artist_genre').transacting(trx).insert({ artist_id: artistId, genre_id: genreId });
  }
}

export default ArtistGenreRepository;