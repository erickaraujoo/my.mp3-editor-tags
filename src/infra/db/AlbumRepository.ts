import Knex from 'knex';
import { AlbumSpotifyEntity } from '../../domain/entities/spotify/album/AlbumSpotifyEntity';
import knex from '../../config/database';

class AlbumRepository {
  static findBySpotifyId(spotifyId: string) {
    return knex('tb_album').select().where({ album_spotify_id: spotifyId }).first();
  }

  static create(album: AlbumSpotifyEntity, trx: Knex.Transaction) {
    return knex('tb_album').transacting(trx).insert({
      album_spotify_id: album.spotifyId,
      album_name: album.name,
      album_image_url: album.imageUrl,
      album_total_tracks: album.totalTracks,
      album_release_date: album.releaseDate,
      album_label: album.label,
      album_spotify_uri: album.spotifyUri,
      album_spotify_url: album.spotifyUrl,
    });
  }
}

export default AlbumRepository;
