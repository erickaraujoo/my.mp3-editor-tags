import Knex from 'knex';
import { ArtistSpotifyEntity } from '../../../entities/spotify/artist/ArtistSpotifyEntity';

export interface ArtistSpotifyInterface {
  show(artists: Array<{ artistSpotifyId: string }>, trx: Knex.Transaction): Promise<ArtistSpotifyEntity[]>;
}
