import Knex from 'knex';
import { ArtistSpotifyEntity } from '../../domain/entities/spotify/artist/ArtistSpotifyEntity';
import knex from '../../config/database';

class ArtistRepository {
  static async findBySpotifyId(artistSpotifyId: string) {
    const genres = await knex('tb_genre as genre')
      .join('tb_rel_artist_genre as artistGenre', 'genre.genre_id', 'artistGenre.genre_id')
      .join('tb_artist as artist', 'artistGenre.artist_id', 'artist.artist_id')
      .select('genre.genre_name as genre')
      .where('artist.artist_spotify_id', artistSpotifyId);

    const artist = await knex('tb_artist')
      .select(
        'artist_id as artistId',
        'artist_spotify_id as spotifyId',
        'artist_name as name',
        'artist_image_url as imageUrl',
        'artist_spotify_uri as spotifyUri',
        'artist_spotify_url as spotifyUrl',
      )
      .where({ artist_spotify_id: artistSpotifyId })
      .first();

    const arrayGenres = genres.map(({ genre }) => ({ genre }));

    if (arrayGenres.length) artist.genres = arrayGenres;

    return artist;
  }

  static async create(artist: ArtistSpotifyEntity, trx: Knex.Transaction) {
    return knex('tb_artist').transacting(trx).insert({
      artist_spotify_id: artist.spotifyId,
      artist_name: artist.name,
      artist_image_url: artist.imageUrl,
      artist_spotify_uri: artist.spotifyUri,
      artist_spotify_url: artist.spotifyUrl,
    });
  }
}

export default ArtistRepository;
