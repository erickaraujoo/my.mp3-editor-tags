import { formattedAlbumCamelCase } from './../../../../main/utils/formatters/albumSpotifyFormatter';
import { formattedAlbumData } from '../../../../main/utils/formatters/albumSpotifyFormatter';
import { AlbumSpotifyEntity } from '../../../../domain/entities/spotify/album/AlbumSpotifyEntity';
import { AlbumSpotifyInterface } from '../../../../domain/usecases/spotify/album/find';
import AlbumService from '../../../../infra/spotify/AlbumService';
import AlbumRepository from '../../../../infra/db/AlbumRepository';
import Knex from 'knex';

export class FindAlbumSpotify implements AlbumSpotifyInterface {
  async show(albumSpotifyId: string, trx: Knex.Transaction): Promise<AlbumSpotifyEntity> {
    const existingAlbum = await AlbumRepository.findBySpotifyId(albumSpotifyId);

    if (existingAlbum) return formattedAlbumCamelCase(existingAlbum);

    const { data, status } = await AlbumService.find(albumSpotifyId);
  
    if (status >= 400) throw new Error('ERROR_SPOTIFY');

    const formattedAlbumSpotify = formattedAlbumData(data);

    const [id] = await AlbumRepository.create(formattedAlbumSpotify, trx);

    formattedAlbumSpotify.albumId = id;

    return formattedAlbumSpotify;
  }
}
