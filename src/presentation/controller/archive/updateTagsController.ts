import { SPOTIFY } from './../../../main/config/constants';
import { timer, replaceBars } from './../../../main/utils/index';
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

  async handle() {
    const trx = await knex.transaction();

    try {
      async function downloadImage(trackName: string, arrayArtists: ArtistSpotifyEntity[], imageUrl: string) {
        const artists = [];

        arrayArtists.map(({ name }: { name: string }) =>
          artists.push(replaceBars(name)),
        );

        const joinedArtists = artists.join(', ');

        const imagePath = path.resolve(
          `${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.BEFORE_PATH}/${joinedArtists} - ${trackName
            .split('?')
            .join('')
            .replace(/\//g, '')}.jpg`,
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

      if (search.length) {
        for (let i = 0; i <= search.length - 1; i++) {
          const album = await this.albumSpotify.show(search[i].albumSpotifyId, trx);
          const track = await this.trackSpotify.show(search[i].trackSpotifyId, album.albumId, trx);
          const arrayArtists = await this.artistsSpotify.show(search[i].artists, trx);

          const imageWriter = await downloadImage(track.name, arrayArtists, album.imageUrl);

          const artists = [];
          const genres = [];

          arrayArtists && arrayArtists.length && arrayArtists.map(({ name }: { name: string }) => artists.push(replaceBars(name)));
          arrayArtists &&
            arrayArtists.length &&
            arrayArtists.map(
              ({ genres: arrayGenres }) =>
                arrayGenres && arrayGenres.length && arrayGenres.map(({ genre }) => genres.push(genre)),
            );

          const setGenres = [...new Set(genres)];

          const joinedArtists = artists.join(', ');
          const joinedGenres = setGenres.join('; ');

          const oldArchivePath = path.resolve(
            `${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.BEFORE_PATH}/${search[i].originalName}`,
          );
          const newArchivePath = path.resolve(
            `${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.AFTER_PATH}/${joinedArtists} - ${track.name}.${CONFIG.FORMAT}`,
          );

          const tags = {
            title: track.name,
            artist: joinedArtists || null,
            album: album.name,
            APIC: imageWriter,
            TRCK: track.number,
            TCON: joinedGenres || null,
          };

          write(tags, oldArchivePath);

          fs.unlink(imageWriter, () => {});

          fs.rename(oldArchivePath, newArchivePath, () => {});

          console.info(`Editando tags... Atual: ${i + 1}, Total: ${search.length}`);

          if (i !== search.length - 1) await timer(SPOTIFY.DELAY_REQUEST / SPOTIFY.LIMIT_REQUISITION);
        }
      }

      trx.commit();

      console.info('Músicas editadas com sucesso...');

      return ok();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
