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
          `${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.BEFORE_PATH}/${joinedArtists} - ${trackName.split('?').join('')}.jpg`,
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

              const artists = [];

              arrayArtists.map(({ name }: { name: string }) => artists.push(name));

              const joinedArtists = artists.join(', ');

              const oldArchivePath = path.resolve(`${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.BEFORE_PATH}/${originalName}`);
              const newArchivePath = path.resolve(`${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.AFTER_PATH}/${joinedArtists} - ${track.name}.${CONFIG.FORMAT}`);

              const tags = {
                title: track.name,
                artist: joinedArtists,
                album: album.name,
                APIC: imageWriter,
                TRCK: track.number,
                TCON: 'Rap & Black',
              };  

              write(tags, oldArchivePath);

              fs.unlink(imageWriter, () => {});

              fs.rename(oldArchivePath, newArchivePath, () => {});
            } catch (error) {
              console.log('error', error);
            }
          }),
        );

      trx.commit();

      return ok();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
