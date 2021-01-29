export interface SearchSpotifyEntity {
  originalName?: string;
  albumSpotifyId?: string;
  artists: Array<{ artistSpotifyId: string }>;
  trackSpotifyId?: string;
}