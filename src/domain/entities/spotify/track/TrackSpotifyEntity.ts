export interface TrackSpotifyEntity {
  trackId?: number;
  albumId: number;
  spotifyId: string;
  name: string;
  number: number;
  explicit: boolean;
  spotifyUri: string;
  spotifyUrl: string;
}