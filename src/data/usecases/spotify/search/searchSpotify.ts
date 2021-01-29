import { formattedNameArchives } from '../../../../main/utils/formatters/archiveFormatter';
import fs from 'fs';
import { CONFIG } from './../../../../main/config/constants';
import { formattedSearchData } from '../../../../main/utils/formatters/searchSpotifyFormatter';
import { SearchSpotifyEntity } from '../../../../domain/entities/spotify/search/SearchSpotifyEntity';
import { AxiosRequestConfig } from 'axios';
import { SearchSpotifyInterface } from '../../../../domain/usecases/spotify/search/find';
import SearchService from '../../../../infra/spotify/SearchService';

interface CustomAxiosRequestInterface extends AxiosRequestConfig {
  q: string;
  type: string;
  limit: number;
}

export class SearchSpotify implements SearchSpotifyInterface {
  async show(): Promise<SearchSpotifyEntity[]> {
    const archives = fs.readdirSync(`${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.PATH}`, { withFileTypes: true });

    const formattedArchives = formattedNameArchives(archives);

    const numberArchivesDelay = Math.ceil(formattedArchives.length / 50);

    const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

    for (let i = 0; i <= numberArchivesDelay; i += 1) {
      const first = i * 50;
      const last = (i + 1) * 50;
      const slice = formattedArchives.slice(first, last);

      const data = await Promise.all(
        slice.map(async ({ title, artist, name }: { title: string; artist: string; name: string }) => {
          const query: CustomAxiosRequestInterface = {
            q: `${artist ? artist : ''} ${title ? title : ''}`,
            type: 'track',
            limit: 1,
          };
  
          const { data, status } = await SearchService.find(query);
  
          if (status >= 400) throw new Error('ERROR_SPOTIFY');
  
          if (!data.tracks.items.length) return null;
  
          const formattedSearchSpotify = formattedSearchData(data.tracks.items[0]);
  
          formattedSearchSpotify.originalName = name;
          
          return formattedSearchSpotify;
        }),
      );

      data.map((val, index) => val === null && data.splice(index, 1));
  
      const index = data.indexOf(null);
  
      if (index > -1) data.splice(index, 1);

      if (i + 1 !== numberArchivesDelay) await timer(5000);
  
      return data;
    }
  }
}
