import { formattedTrackCamelCase } from './../../../../main/utils/formatters/trackSpotifyFormatter';
import { formattedTrackData } from '../../../../main/utils/formatters/trackSpotifyFormatter';
import { TrackSpotifyEntity } from '../../../../domain/entities/spotify/track/TrackSpotifyEntity';
import { TrackSpotifyInterface } from '../../../../domain/usecases/spotify/track/find';
import TrackService from '../../../../infra/spotify/TrackService';
import Knex from 'knex';
import TrackRepository from '../../../../infra/db/TrackRepository';

export class FindTrackspotify implements TrackSpotifyInterface {
  async show(trackSpotifyId: string, albumId: number, trx: Knex.Transaction): Promise<TrackSpotifyEntity> {
    const existingTrack = await TrackRepository.findBySpotifyId(trackSpotifyId);

    if (existingTrack) return formattedTrackCamelCase(existingTrack);

    const { data, status } = await TrackService.find(trackSpotifyId);

    if (status >= 400) throw new Error('ERROR_SPOTIFY');

    const formattedTrackSpotify = formattedTrackData(data, albumId);

    const [id] = await TrackRepository.create(formattedTrackSpotify, trx);

    formattedTrackSpotify.trackId = id;

    return formattedTrackSpotify;
  }
}
