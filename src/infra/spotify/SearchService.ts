import { AxiosRequestConfig } from 'axios';
import { search } from "../../main/service/spotify";

class SearchService {
  static async find(query: AxiosRequestConfig) {
    try {
      const { data, status } = await search.find(query);

      return { data, status };
    } catch (error) {
      return {
        data: error.response.data,
        status: error.response.status,
      }
    }
  }
}

export default SearchService;