import { FindArtistSpotify } from '../../../../data/usecases/spotify/artist/find';
import { FindTrackspotify } from '../../../../data/usecases/spotify/track/find';
import { FindAlbumSpotify } from '../../../../data/usecases/spotify/album/find';
import { UpdateTagsArchiveController } from './../../../../presentation/controller/archive/updateTagsController';
import { Controller } from './../../../../presentation/protocols/controller';
import { SearchSpotify } from '../../../../data/usecases/spotify/search/searchSpotify';

export function makeUpdateTagsController(): Controller {
  const searchData = new SearchSpotify();
  const albumData = new FindAlbumSpotify();
  const trackData = new FindTrackspotify();
  const artistsData = new FindArtistSpotify();
  return new UpdateTagsArchiveController(searchData, albumData, trackData, artistsData);
}