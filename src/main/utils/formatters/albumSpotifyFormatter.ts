import { AlbumSpotifyEntity } from '../../../domain/entities/spotify/album/AlbumSpotifyEntity';

interface AlbumInterface {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  label: string;
  total_tracks: number;
  release_date: string;
  release_date_precision: string;
  uri: string;
  external_urls: { spotify: string };
}

interface AlbumKnexInterface {
  album_id: number;
  album_spotify_id: string;
  album_name: string;
  album_image_url: string;
  album_total_tracks: number;
  album_release_date: string;
  album_label: string;
  album_spotify_uri: string;
  album_spotify_url: string;
}

export const formattedAlbumData = (data: AlbumInterface): AlbumSpotifyEntity => ({
  spotifyId: data.id,
  name: data.name,
  imageUrl: data.images[0].url,
  totalTracks: data.total_tracks,
  releaseDate: data.release_date,
  label: data.label,
  spotifyUri: data.uri,
  spotifyUrl: data.external_urls.spotify,
});

export const formattedAlbumCamelCase = (data: AlbumKnexInterface): AlbumSpotifyEntity => ({
  albumId: data.album_id,
  spotifyId: data.album_spotify_id,
  name: data.album_name,
  imageUrl: data.album_image_url,
  totalTracks: data.album_total_tracks,
  releaseDate: data.album_release_date,
  label: data.album_label,
  spotifyUri: data.album_spotify_uri,
  spotifyUrl: data.album_image_url,
});
