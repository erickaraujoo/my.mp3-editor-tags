import { SearchSpotifyEntity } from '../../../domain/entities/spotify/search/SearchSpotifyEntity';

export const formattedSearchData = ({
  album,
  artists,
  id: trackSpotifyId,
}: {
  album: any;
  artists: Array<any>;
  id: string;
}): SearchSpotifyEntity => {
  const formattedArtists = artists.map(
    ({ id: artistSpotifyId }: { id: string }): { artistSpotifyId: string } => ({ artistSpotifyId }),
  );

  return {
    albumSpotifyId: album.id,
    artists: formattedArtists,
    trackSpotifyId,
  };
};
