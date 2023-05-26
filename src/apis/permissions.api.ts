import {HttpDeletePermissionRequest,
  HttpDeletePermissionResponse,
  HttpDeletePlatformPermissionsRequest,
  HttpDeletePlatformPermissionsResponse,
  HttpGetAllPermissionsRequest,
  HttpGetAllPermissionsResponse,
  HttpGetOnePermissionRequest,
  HttpGetOnePermissionResponse,
  HttpSyncPermissionsRequest,
  HttpSyncPermissionsResponse} from '../interfaces/permission.interface';
import { CIP_OPTIONS, PLATFORM } from '../interfaces/types.type';
import { Actor } from '../interfaces/user.interface';
import { JWTClient } from '../services/jwt.client';
import { API_ENDPOINTS } from './api.config';
import { BaseApi } from './base.api';

export default class PermissionsApi extends BaseApi {
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

  public async getAll(): Promise<HttpGetAllPermissionsResponse> {
    return this.sendApiRequest<HttpGetAllPermissionsRequest, HttpGetAllPermissionsResponse>(
      API_ENDPOINTS.PERMISSION.GET_ALL,
      {},
      'Unable to get Permissions.',
    );
  }

  public async getOne(key: string): Promise<HttpGetOnePermissionResponse> {
    return this.sendApiRequest<HttpGetOnePermissionRequest, HttpGetOnePermissionResponse>(
      API_ENDPOINTS.PERMISSION.GET_ONE,
      { key },
      `Unable to get Permission against key ${key}.`,
    );
  }

  public async sync(data: HttpSyncPermissionsRequest): Promise<HttpSyncPermissionsResponse> {
    return this.sendApiRequest<HttpSyncPermissionsRequest, HttpSyncPermissionsResponse>(
      API_ENDPOINTS.PERMISSION.SYNC,
      data,
      `Unable to sync Permissions.`,
    );
  }

  public async delete(key: string): Promise<HttpDeletePermissionResponse> {
    return this.sendApiRequest<HttpDeletePermissionRequest, HttpDeletePermissionResponse>(
      API_ENDPOINTS.PERMISSION.DELETE,
      { key },
      `Unable to delete Permission against key ${key}.`,
    );
  }

  public async deletePlatformPermissions(): Promise<HttpDeletePlatformPermissionsResponse> {
    return this.sendApiRequest<HttpDeletePlatformPermissionsRequest, HttpDeletePlatformPermissionsResponse>(
      API_ENDPOINTS.PERMISSION.DELETE_PLATFORM,
      {},
      `Unable to delete Platform Permissions.`,
    );
  }
}
