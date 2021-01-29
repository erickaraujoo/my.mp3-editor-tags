import Knex from 'knex';
import { TrackSpotifyEntity } from '../../domain/entities/spotify/track/TrackSpotifyEntity';
import knex from '../../config/database';

class TrackRepository {
  static async findBySpotifyId(trackSpotifyId: string) {
    return knex('tb_track').select().where({ track_spotify_id: trackSpotifyId }).first();
  }

  static async create(track: TrackSpotifyEntity, trx: Knex.Transaction) {
    return knex('tb_track').transacting(trx).insert({
      album_id: track.albumId,
      track_spotify_id: track.spotifyId,
      track_name: track.name,
      track_number: track.number,
      track_explicit: track.explicit,
      track_spotify_uri: track.spotifyUri,
      track_spotify_url: track.spotifyUrl,
    });
  }
}

export default TrackRepository;
