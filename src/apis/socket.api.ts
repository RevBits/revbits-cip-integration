import { HttpGenerateSocketTokenRequest, HttpGenerateSocketTokenResponse } from '../interfaces/socket.interface';
import { CIP_OPTIONS, PLATFORM } from '../interfaces/types.type';
import { JWTClient } from '../services/jwt.client';
import { CIPError } from '../utils/errors';
import { logger } from '../utils/logger';
import { API_ENDPOINTS } from './api.config';
import { BaseApi } from './base.api';

export default class SocketApi extends BaseApi {
  constructor(public baseUrl: string, public platform: PLATFORM, public privKey: string, public options: CIP_OPTIONS) {
    super(baseUrl, options, platform, () => {
      const jwtClient = new JWTClient(platform, privKey);
      return jwtClient.getJWT();
    });
  }

  public async generateSocketToken(): Promise<string | undefined> {
    try {
      logger.info('Generating socket token...');
      const requestData: HttpGenerateSocketTokenRequest = { platform: this.platform };
      const response = await this.post<HttpGenerateSocketTokenRequest, HttpGenerateSocketTokenResponse>(
        API_ENDPOINTS.WEB_SOCKET.GENERATE_SOCKET_TOKEN,
        requestData,
      );

      if (response?.return_code === 1000) {
        logger.info('Socket token generated successfully.');
        return response?.data?.wsToken;
      } else {
        throw new CIPError(response?.message, response);
      }
    } catch (error) {
      logger.error('Failed to generate socket token:', error);
      throw error;
    }
  }
}
