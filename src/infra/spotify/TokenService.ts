import { token } from "../../main/service/spotify";

class TokenService {
  static async find(grantType: string) {
    try {
      const { data, status } = await token.find(grantType);

      return { data, status };
    } catch (error) {
      return {
        data: error.response.data,
        status: error.response.status,
      } 
    }
  }
}

export default TokenService;