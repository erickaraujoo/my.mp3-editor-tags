import { formattedArtistData } from '../../../../main/utils/formatters/artistSpotifyFormatter';
import ArtistService from '../../../../infra/spotify/ArtistService';
import { ArtistSpotifyEntity } from '../../../../domain/entities/spotify/artist/ArtistSpotifyEntity';
import { ArtistSpotifyInterface } from '../../../../domain/usecases/spotify/artist/find';
import ArtistRepository from '../../../../infra/db/ArtistRepository';
import Knex from 'knex';
import GenreRepository from '../../../../infra/db/GenreRepository';
import ArtistGenreRepository from '../../../../infra/db/ArtistGenreRepository';

export class FindArtistSpotify implements ArtistSpotifyInterface {
  async show(artists: Array<{ artistSpotifyId: string }>, trx: Knex.Transaction): Promise<ArtistSpotifyEntity[]> {
    const arrayArtists = await Promise.all(
      artists.map(async ({ artistSpotifyId }: { artistSpotifyId: string }) => {
        const existingArtist = await ArtistRepository.findBySpotifyId(artistSpotifyId);

        if (existingArtist) return existingArtist;

        const { data, status } = await ArtistService.find(artistSpotifyId);

        if (status >= 400) throw new Error('ERROR_SPOTIFY');

        const formattedArtistSpotify = formattedArtistData(data);

        const [id] = await ArtistRepository.create(formattedArtistSpotify, trx);

        formattedArtistSpotify.artistId = id;

        formattedArtistSpotify.genres.map(async ({ genre: genreName }: { genre: string }) => {
          const existingGenre = await GenreRepository.findByName(genreName);

          if (!existingGenre) {
            const [id] = await GenreRepository.create(genreName, trx);

            return await ArtistGenreRepository.create(formattedArtistSpotify.artistId, id, trx);
          }

          return await ArtistGenreRepository.create(formattedArtistSpotify.artistId, existingGenre.id, trx);
        });

        return formattedArtistSpotify;
      }),
    );

    return arrayArtists;
  }
}
