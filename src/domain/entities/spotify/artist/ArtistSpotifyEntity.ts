export interface ArtistSpotifyEntity {
  artistId?: number;
  spotifyId: string;
  name: string;
  genres?: Array<{ genre?: string }>;
  imageUrl?: string;
  spotifyUri: string;
  spotifyUrl: string;
}
