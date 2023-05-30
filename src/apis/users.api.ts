import { createReadStream } from 'fs';
import FormData from 'form-data';

import { CIP_OPTIONS, PLATFORM } from '../interfaces/types.type';
import {Actor,
  HttpCheckUsersExistenceRequest,
  HttpCheckUsersExistenceResponse,
  HttpCreateBulkUsersRequest,
  HttpCreateBulkUsersResponse,
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
  HttpUpdateUserResponse,
  HttpUploadUserAvatarResponse} from '../interfaces/user.interface';
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

  public async getOne(id: string, username: string | null | undefined = null): Promise<HttpGetOneUserResponse> {
    return this.sendApiRequest<HttpGetOneUserRequest, HttpGetOneUserResponse>(
      API_ENDPOINTS.USER.GET_ONE,
      { id, username },
      id ? `Unable to get User against id ${id}.` : `Unable to get User against username ${username}.`,
    );
  }

  public async create(data: HttpCreateUserRequest): Promise<HttpCreateUserResponse> {
    return this.sendApiRequest<HttpCreateUserRequest, HttpCreateUserResponse>(
      API_ENDPOINTS.USER.CREATE,
      data,
      'Unable to create User.',
    );
  }

  public async createBulk(data: HttpCreateBulkUsersRequest): Promise<HttpCreateBulkUsersResponse> {
    return this.sendApiRequest<HttpCreateBulkUsersRequest, HttpCreateBulkUsersResponse>(
      API_ENDPOINTS.USER.CREATE_BULK,
      data,
      'Unable to create bulk Users.',
    );
  }

  public async update(data: HttpUpdateUserRequest): Promise<HttpUpdateUserResponse> {
    return this.sendApiRequest<HttpUpdateUserRequest, HttpUpdateUserResponse>(
      API_ENDPOINTS.USER.UPDATE,
      data,
      `Unable to update User against id ${data.id}.`,
    );
  }

  public async uploadAvatar(filePath: string): Promise<HttpUploadUserAvatarResponse> {
    const file = createReadStream(filePath);

    const formData = new FormData();
    formData.append('file', file);

    return this.sendFormDataApiRequest<HttpUploadUserAvatarResponse>(
      API_ENDPOINTS.USER.UPLOAD_AVATAR,
      formData,
      `User Avatar could not be uploaded.`,
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

  public async checkUsersExistenceByUsernames(usernames: Array<string>): Promise<HttpCheckUsersExistenceResponse> {
    return this.sendApiRequest<HttpCheckUsersExistenceRequest, HttpCheckUsersExistenceResponse>(
      API_ENDPOINTS.USER.CHECK_USERS_EXISTENCE_BY_USERNAMES,
      { usernames },
      `Unable to check existence of users against given usernames list.`,
    );
  }
}
