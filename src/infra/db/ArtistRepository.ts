import Knex from 'knex';
import { ArtistSpotifyEntity } from '../../domain/entities/spotify/artist/ArtistSpotifyEntity';
import knex from '../../config/database';

class ArtistRepository {
  static async findBySpotifyId(artistSpotifyId: string) {
    return knex('tb_artist').select().where({ artist_spotify_id: artistSpotifyId }).first();
  }

  static async create(artist: ArtistSpotifyEntity, trx: Knex.Transaction) {
    return knex('tb_artist').transacting(trx).insert({
      artist_spotify_id: artist.spotifyId,
      artist_name: artist.name,
      artist_image_url: artist.imageUrl,
      artist_spotify_uri: artist.spotifyUri,
      artist_spotify_url: artist.spotifyUrl,
    });
  }
}

export default ArtistRepository;
