import Knex from 'knex';
import { TrackSpotifyEntity } from '../../../entities/spotify/track/TrackSpotifyEntity';

export interface TrackSpotifyInterface {
  show(trackSpotifyId: string, albumId: number, trx: Knex.Transaction): Promise<TrackSpotifyEntity>;
}