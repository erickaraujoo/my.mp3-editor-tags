import { ArtistSpotifyEntity } from './../../../domain/entities/spotify/artist/ArtistSpotifyEntity';
import { ArtistSpotifyInterface } from './../../../domain/usecases/spotify/artist/find';
import { TrackSpotifyInterface } from './../../../domain/usecases/spotify/track/find';
import { AlbumSpotifyInterface } from './../../../domain/usecases/spotify/album/find';
import { SearchSpotifyInterface } from './../../../domain/usecases/spotify/search/find';
import { HttpRequest } from './../../protocols/http';
import { Controller } from './../../protocols/controller';
import { ok } from '../../../main/utils/apiResponse';
import path from 'path';
import { CONFIG } from '../../../main/config/constants';
import { write } from 'node-id3';
import fs from 'fs';
import axios from 'axios';
import knex from '../../../main/config/database/default-connection';

export class UpdateTagsArchiveController implements Controller {
  constructor(
    private readonly searchSpotify: SearchSpotifyInterface,
    private readonly albumSpotify: AlbumSpotifyInterface,
    private readonly trackSpotify: TrackSpotifyInterface,
    private readonly artistsSpotify: ArtistSpotifyInterface,
  ) {}

  async handle(httpRequest: HttpRequest) {
    const trx = await knex.transaction();

    try {
      async function downloadImage(trackName: string, arrayArtists: ArtistSpotifyEntity[], imageUrl: string) {
        const artists = [];

        arrayArtists.map(({ name }: { name: string }) => artists.push(name));

        const joinedArtists = artists.join(', ');

        const imagePath = path.resolve(
          `${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.PATH}/${joinedArtists} - ${trackName}.jpg`,
        );

        const writer = fs.createWriteStream(imagePath);

        const response = await axios.get(imageUrl, { responseType: 'stream' });

        response.data.pipe(writer);

        return new Promise<string>((resolve, reject) => {
          writer.on('finish', () => resolve(imagePath));
          writer.on('error', (error) => reject(error));
        });
      }

      const search = await this.searchSpotify.show();

      if (search.length)
        await Promise.all(
          search.map(async ({ albumSpotifyId, trackSpotifyId, artists, originalName }) => {
            const album = await this.albumSpotify.show(albumSpotifyId, trx);
            const track = await this.trackSpotify.show(trackSpotifyId, album.albumId, trx);
            const arrayArtists = await this.artistsSpotify.show(artists, trx);

            try {
              const imageWriter = await downloadImage(track.name, arrayArtists, album.imageUrl);

              const archivePath = path.resolve(
                `${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.PATH}/${originalName}`,
              );

              const artists = [];

              arrayArtists.map(({ name }: { name: string }) => artists.push(name));

              const joinedArtists = artists.join('; ');

              const tags = {
                title: track.name,
                artist: joinedArtists,
                album: album.name,
                APIC: imageWriter,
                TRCK: track.number,
                TCON: 'Rap & Black',
              };

              write(tags, archivePath);

              fs.unlink(imageWriter, (err) => console.log('err', err));
            } catch (error) {
              console.log('error', error);
            }
          }),
        );

      trx.commit();

      /** ---- 3ª PARTE
      try {
        await downloadImage(urls);

        urls.map(async ({ title, format }: { title: string; format: string; }) => {
          const archivePath = path.resolve(
            `${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.PATH}/${title}.${CONFIG.FORMAT}`,
          );
          const imagePath = path.resolve(
            `${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.PATH}/${title}.${format}`,
          );

          const tags = {
            title: 'Set Djay W 3',
            artist: 'MC PP da VS; MC Vitão do Savoy; MC Davi; MC Ryan SP',
            album: 'Album teste 2',
            APIC: imagePath,
            TRCK: 1,
            TCON: 'Rap & Black',
          };

          write(tags, archivePath);
        });

      } catch (error) {
        console.log('error', error);
      }

      */

      return ok();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
