import { timer } from './../../../../main/utils/index';
import { formattedNameArchives } from '../../../../main/utils/formatters/archiveFormatter';
import fs from 'fs';
import { CONFIG, SPOTIFY } from './../../../../main/config/constants';
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
    const archives = fs.readdirSync(`${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.BEFORE_PATH}`, {
      withFileTypes: true,
    });

    const formattedArchives = formattedNameArchives(archives);

    const numberArchivesDelay = Math.ceil((formattedArchives.length) / SPOTIFY.LIMIT_REQUISITION);

    const arraySearchSpotify = [];

    for (let i = 0; i <= numberArchivesDelay - 1; i += 1) {
      const first = i * SPOTIFY.LIMIT_REQUISITION;
      const last = (i + 1) * SPOTIFY.LIMIT_REQUISITION;
      const slice = formattedArchives.slice(first, last);

      console.info(`Info: Buscando dados... Range: De ${first} a ${last}, Total de músicas encontradas: ${formattedArchives.length}`);

      const filterSlice = slice.filter((value) => value);

      const data = await Promise.all(
        filterSlice.map(async ({ archive, name }: { archive: string; name: string }) => {
          const query: CustomAxiosRequestInterface = {
            q: archive,
            type: 'track',
            limit: 1,
          };

          const { data, status } = await SearchService.find(query);

          if (status >= 400) { console.log({ data }); throw new Error('ERROR_SPOTIFY') };

          if (!data?.tracks?.items?.length) return null;

          const formattedSearchSpotify = formattedSearchData(data.tracks.items[0]);

          formattedSearchSpotify.originalName = name;

          return formattedSearchSpotify;
        }),
      );

      const searchSpotify = data.filter((value) => value);

      if (i !== numberArchivesDelay) await timer(1500);

      searchSpotify.map((data) => arraySearchSpotify.push(data));
    }

    return arraySearchSpotify;
  }
}
