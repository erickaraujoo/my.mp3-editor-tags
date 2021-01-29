import axios from 'axios';
import { track } from './../../main/service/spotify';

class TrackService {
  static async find(trackId: string) {
    try {
      const { data, status } = await track.find(trackId);

      return { data, status };
    } catch (error) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
  }
} 

export default TrackService;