import { CIP_OPTIONS, PLATFORM } from '../interfaces/types.type';
import {Actor,
  HttpCreateUserRequest,
  HttpCreateUserResponse,
  HttpDeleteUserRequest,
  HttpDeleteUserResponse,
  HttpGetAllUsersRequest,
  HttpGetAllUsersResponse,
  HttpGetOneUserRequest,
  HttpGetOneUserResponse,
  HttpRestoreUserRequest,
  HttpRestoreUserResponse,
  HttpUpdateUserRequest,
  HttpUpdateUserResponse} from '../interfaces/user.interface';
import { JWTClient } from '../services/jwt.client';
import { API_ENDPOINTS } from './api.config';
import { BaseApi } from './base.api';

export default class UsersApi extends BaseApi {
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

  public async getAll(data: HttpGetAllUsersRequest | undefined): Promise<HttpGetAllUsersResponse> {
    return this.sendApiRequest<HttpGetAllUsersRequest, HttpGetAllUsersResponse>(
      API_ENDPOINTS.USER.GET_ALL,
      data,
      'Unable to get Users.',
    );
  }

  public async getOne(id: string): Promise<HttpGetOneUserResponse> {
    return this.sendApiRequest<HttpGetOneUserRequest, HttpGetOneUserResponse>(
      API_ENDPOINTS.USER.GET_ONE,
      { id },
      `Unable to get User against id ${id}.`,
    );
  }

  public async create(data: HttpCreateUserRequest): Promise<HttpCreateUserResponse> {
    return this.sendApiRequest<HttpCreateUserRequest, HttpCreateUserResponse>(
      API_ENDPOINTS.USER.CREATE,
      data,
      'Unable to create User.',
    );
  }

  public async update(data: HttpUpdateUserRequest): Promise<HttpUpdateUserResponse> {
    return this.sendApiRequest<HttpUpdateUserRequest, HttpUpdateUserResponse>(
      API_ENDPOINTS.USER.UPDATE,
      data,
      `Unable to update User against id ${data.user.id}.`,
    );
  }

  public async delete(id: string): Promise<HttpDeleteUserResponse> {
    return this.sendApiRequest<HttpDeleteUserRequest, HttpDeleteUserResponse>(
      API_ENDPOINTS.USER.DELETE,
      { id },
      `Unable to delete User against id ${id}.`,
    );
  }

  public async restore(id: string): Promise<HttpRestoreUserResponse> {
    return this.sendApiRequest<HttpRestoreUserRequest, HttpRestoreUserResponse>(
      API_ENDPOINTS.USER.RESTORE,
      { id },
      `Unable to restore User against id ${id}.`,
    );
  }
}
