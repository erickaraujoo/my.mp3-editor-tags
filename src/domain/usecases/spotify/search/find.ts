import { SearchSpotifyEntity } from '../../../entities/spotify/search/SearchSpotifyEntity';

export interface SearchSpotifyInterface {
  show(): Promise<SearchSpotifyEntity[]>; 
}