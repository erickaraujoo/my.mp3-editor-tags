import { formattedArtistCamelCase } from './../../../../main/utils/formatters/artistSpotifyFormatter';
import { formattedArtistData } from '../../../../main/utils/formatters/artistSpotifyFormatter';
import ArtistService from '../../../../infra/spotify/ArtistService';
import { ArtistSpotifyEntity } from '../../../../domain/entities/spotify/artist/ArtistSpotifyEntity';
import { ArtistSpotifyInterface } from '../../../../domain/usecases/spotify/artist/find';
import ArtistRepository from '../../../../infra/db/ArtistRepository';
import Knex from 'knex';

export class FindArtistSpotify implements ArtistSpotifyInterface {
  async show(artists: Array<{ artistSpotifyId: string }>, trx: Knex.Transaction): Promise<ArtistSpotifyEntity[]> {
    const arrayArtists = await Promise.all(
      artists.map(async ({ artistSpotifyId }: { artistSpotifyId: string }) => {
        const existingArtist = await ArtistRepository.findBySpotifyId(artistSpotifyId);

        if (existingArtist) return formattedArtistCamelCase(existingArtist);

        const { data, status } = await ArtistService.find(artistSpotifyId);

        if (status >= 400) throw new Error('ERROR_SPOTIFY');

        const formattedArtistSpotify = formattedArtistData(data);

        const [id] = await ArtistRepository.create(formattedArtistSpotify, trx);

        formattedArtistSpotify.artistId = id;

        return formattedArtistSpotify;
      }),
    );

    return arrayArtists;
  }
}
