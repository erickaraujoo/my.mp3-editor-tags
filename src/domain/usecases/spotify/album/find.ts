import Knex from 'knex';
import { AlbumSpotifyEntity } from '../../../entities/spotify/album/AlbumSpotifyEntity';

export interface AlbumSpotifyInterface {
  show(albumSpotifyId: string, trx: Knex.Transaction): Promise<AlbumSpotifyEntity>;
}
