import { album } from '../../main/service/spotify';

class AlbumService {
  static async find(albumSpotifyId: string) {
    try {
      const { data, status } = await album.find(albumSpotifyId);

      return { data, status };
    } catch (error) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
  }
}

export default AlbumService;
