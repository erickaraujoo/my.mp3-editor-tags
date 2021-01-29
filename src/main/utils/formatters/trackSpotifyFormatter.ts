import { TrackSpotifyEntity } from './../../../domain/entities/spotify/track/TrackSpotifyEntity';

interface TrackInterface {
  id: string;
  name: string;
  track_number: number;
  explicit: boolean;
  uri: string;
  external_urls: { spotify: string };
}

interface TrackKnexInterface {
  track_id: number;
  album_id: number;
  track_spotify_id: string;
  track_name: string;
  track_number: number;
  track_explicit: boolean;
  track_spotify_uri: string;
  track_spotify_url: string;
}

export const formattedTrackData = (data: TrackInterface, albumId: number): TrackSpotifyEntity => ({
  albumId,
  spotifyId: data.id,
  name: data.name,
  number: data.track_number,
  explicit: data.explicit,
  spotifyUri: data.uri,
  spotifyUrl: data.external_urls.spotify,
})

export const formattedTrackCamelCase = (data: TrackKnexInterface): TrackSpotifyEntity => ({
  trackId: data.track_id,
  albumId: data.album_id,
  spotifyId: data.track_spotify_id,
  name: data.track_name,
  number: data.track_number,
  explicit: data.track_explicit,
  spotifyUri: data.track_spotify_uri,
  spotifyUrl: data.track_spotify_uri,
})