import { ArtistSpotifyEntity } from './../../../domain/entities/spotify/artist/ArtistSpotifyEntity';

interface ArtistInterface {
  id: string;
  name: string;
  genres?: Array<{}>;
  images: Array<{ url: string }>;
  uri: string;
  external_urls: { spotify: string };
}

interface ArtistKnexInterface {
  artist_id: number;
  artist_spotify_id: string;
  artist_name: string;
  artist_image_url: string;
  artist_spotify_uri: string;
  artist_spotify_url: string;
}

export const formattedArtistData = (data: ArtistInterface): ArtistSpotifyEntity => {
  const genres = data.genres.map((genre: string) => ({
    genre: genre.toLowerCase().replace(/(?:^|\s)\S/g, (a: string) => a.toUpperCase()),
  }));

  return {
    spotifyId: data.id,
    name: data.name,
    genres,
    imageUrl: data.images.length ? data.images[0].url : null,
    spotifyUri: data.uri,
    spotifyUrl: data.external_urls.spotify,
  };
};
