import {HttpCreateBulkRolesRequest,
  HttpCreateBulkRolesResponse,
  HttpCreateRoleRequest,
  HttpCreateRoleResponse,
  HttpDeleteRoleRequest,
  HttpDeleteRoleResponse,
  HttpGetAllRolesRequest,
  HttpGetAllRolesResponse,
  HttpGetOneRoleRequest,
  HttpGetOneRoleResponse,
  HttpUpdateRoleRequest,
  HttpUpdateRoleResponse} from '../interfaces/role.interface';
import { CIP_OPTIONS, PLATFORM } from '../interfaces/types.type';
import { Actor } from '../interfaces/user.interface';
import { JWTClient } from '../services/jwt.client';
import { API_ENDPOINTS } from './api.config';
import { BaseApi } from './base.api';

export default class RolesApi extends BaseApi {
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

  public async getAll(data: HttpGetAllRolesRequest | undefined): Promise<HttpGetAllRolesResponse> {
    return this.sendApiRequest<HttpGetAllRolesRequest, HttpGetAllRolesResponse>(
      API_ENDPOINTS.ROLE.GET_ALL,
      data,
      'Unable to get Roles.',
    );
  }

  public async getOne(id: string): Promise<HttpGetOneRoleResponse> {
    return this.sendApiRequest<HttpGetOneRoleRequest, HttpGetOneRoleResponse>(
      API_ENDPOINTS.ROLE.GET_ONE,
      { id },
      `Unable to get Role against id ${id}.`,
    );
  }

  public async create(data: HttpCreateRoleRequest): Promise<HttpCreateRoleResponse> {
    return this.sendApiRequest<HttpCreateRoleRequest, HttpCreateRoleResponse>(
      API_ENDPOINTS.ROLE.CREATE,
      data,
      'Unable to create Role.',
    );
  }

  public async createBulk(data: HttpCreateBulkRolesRequest): Promise<HttpCreateBulkRolesResponse> {
    return this.sendApiRequest<HttpCreateBulkRolesRequest, HttpCreateBulkRolesResponse>(
      API_ENDPOINTS.ROLE.CREATE_BULK,
      data,
      'Unable to create bulk Roles.',
    );
  }

  public async update(data: HttpUpdateRoleRequest): Promise<HttpUpdateRoleResponse> {
    return this.sendApiRequest<HttpUpdateRoleRequest, HttpUpdateRoleResponse>(
      API_ENDPOINTS.ROLE.UPDATE,
      data,
      `Unable to update Role against id ${data.id}.`,
    );
  }

  public async delete(id: string): Promise<HttpDeleteRoleResponse> {
    return this.sendApiRequest<HttpDeleteRoleRequest, HttpDeleteRoleResponse>(
      API_ENDPOINTS.ROLE.DELETE,
      { id },
      `Unable to delete Role against id ${id}.`,
    );
  }
}
