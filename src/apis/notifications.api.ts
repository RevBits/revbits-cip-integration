import {HttpCreateNotificationRequest,
  HttpCreateNotificationResponse,
  HttpDeleteNotificationRequest,
  HttpDeleteNotificationResponse,
  HttpGetAllNotificationsRequest,
  HttpGetAllNotificationsResponse,
  HttpGetOneNotificationRequest,
  HttpGetOneNotificationResponse,
  HttpReadNotificationRequest,
  HttpReadNotificationResponse} from '../interfaces/notification.interface';
import { CIP_OPTIONS, PLATFORM } from '../interfaces/types.type';
import { Actor } from '../interfaces/user.interface';
import { JWTClient } from '../services/jwt.client';
import { API_ENDPOINTS } from './api.config';
import { BaseApi } from './base.api';

export default class NotificationsApi extends BaseApi {
  constructor(
    public baseUrl: string,
    public platform: PLATFORM,
    public privKey: string,
    public options: CIP_OPTIONS,
    actor: Actor | null | undefined = null,
  ) {
    super(baseUrl, options, platform, () => {
      const jwtClient = new JWTClient(platform, privKey, actor);
      return jwtClient.getJWT();
    });
  }

  public async getAll(data: HttpGetAllNotificationsRequest | undefined): Promise<HttpGetAllNotificationsResponse> {
    return this.sendApiRequest<HttpGetAllNotificationsRequest, HttpGetAllNotificationsResponse>(
      API_ENDPOINTS.NOTIFICATION.GET_ALL,
      data,
      'Unable to get Notifications.',
    );
  }

  public async getOne(platformNotificationId: string): Promise<HttpGetOneNotificationResponse> {
    return this.sendApiRequest<HttpGetOneNotificationRequest, HttpGetOneNotificationResponse>(
      API_ENDPOINTS.NOTIFICATION.GET_ONE,
      { platformNotificationId },
      `Unable to get Notification against platformNotificationId ${platformNotificationId}.`,
    );
  }

  public async create(data: HttpCreateNotificationRequest): Promise<HttpCreateNotificationResponse> {
    return this.sendApiRequest<HttpCreateNotificationRequest, HttpCreateNotificationResponse>(
      API_ENDPOINTS.NOTIFICATION.CREATE,
      data,
      'Unable to create Notification.',
    );
  }

  public async read(platformNotificationId: string): Promise<HttpReadNotificationResponse> {
    return this.sendApiRequest<HttpReadNotificationRequest, HttpReadNotificationResponse>(
      API_ENDPOINTS.NOTIFICATION.READ,
      { platformNotificationId },
      `Unable to read Notification against platformNotificationId ${platformNotificationId}.`,
    );
  }

  public async delete(platformNotificationId: string): Promise<HttpDeleteNotificationResponse> {
    return this.sendApiRequest<HttpDeleteNotificationRequest, HttpDeleteNotificationResponse>(
      API_ENDPOINTS.NOTIFICATION.DELETE,
      { platformNotificationId },
      `Unable to delete Notification against platformNotificationId ${platformNotificationId}.`,
    );
  }
}
