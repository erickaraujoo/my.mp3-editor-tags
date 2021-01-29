import { ArtistSpotifyEntity } from './../../../domain/entities/spotify/artist/ArtistSpotifyEntity';

interface ArtistInterface {
  id: string;
  name: string;
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
  return {
    spotifyId: data.id,
    name: data.name,
    imageUrl: data.images.length ? data.images[0].url : null,
    spotifyUri: data.uri,
    spotifyUrl: data.external_urls.spotify, 
  }
};

export const formattedArtistCamelCase = (data: ArtistKnexInterface): ArtistSpotifyEntity => ({
  artistId: data.artist_id,
  spotifyId: data.artist_spotify_id,
  name: data.artist_name,
  imageUrl: data.artist_image_url,
  spotifyUri: data.artist_spotify_uri,
  spotifyUrl: data.artist_spotify_url,
})
