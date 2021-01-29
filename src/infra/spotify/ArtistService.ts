import { artist } from "../../main/service/spotify";

class ArtistService {
  static async find(artistSpotifyId: string) {
    try {
      const { data, status } = await artist.find(artistSpotifyId);

      return { data, status };
    } catch (error) {
      return {
        data: error.response.data,
        status: error.response.status,
      }
    }
  }
}

export default ArtistService;