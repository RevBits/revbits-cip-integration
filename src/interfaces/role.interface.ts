import { HttpPaginatedResponse, HttpResponse } from './http.interface';
import { PLATFORM } from './types.type';

interface RolePermissions {
  [key: string]: boolean;
}

interface PlatformPermissions {
  dtPermissions: RolePermissions;
  esPermissions: RolePermissions;
  ppPermissions: RolePermissions;
  upPermissions: RolePermissions;
  epsPermissions: RolePermissions;
  pamPermissions: RolePermissions;
  ztnPermissions: RolePermissions;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: RolePermissions;
  platformPermissions: PlatformPermissions;
  createdAt: Date;
  updatedAt: Date;
}

type RoleSortableKeys = {
  [K in keyof Role]: Role[K] extends string | number ? K : never;
}[keyof Role];

interface RoleQueryParams {
  names?: Array<string>;
  name?: string;
  description?: string;
}

export interface HttpGetAllRolesRequest {
  platform?: PLATFORM;
  page?: number;
  sort?: RoleSortableKeys;
  direction?: string;
  perPage?: number;
  query?: RoleQueryParams;
  search?: string;
}

export type HttpGetAllRolesResponse = HttpPaginatedResponse<Role>;

export interface HttpGetOneRoleRequest {
  platform?: PLATFORM;
  id: string;
}

export type HttpGetOneRoleResponse = HttpResponse<Role>;

export interface HttpCreateRole {
  name: string;
  description?: string | null;
  permissions: {
    [key: string]: boolean;
  };
  isDeletable?: boolean;
}

export interface HttpCreateRoleRequest {
  platform?: string;
  role: HttpCreateRole;
}

export type HttpCreateRoleResponse = HttpGetOneRoleResponse;

export interface HttpCreateBulkRolesRequest {
  platform?: string;
  roles: Array<HttpCreateRole>;
}

export type HttpCreateBulkRolesResponse = HttpGetOneRoleResponse;

export interface HttpUpdateRoleRequest {
  platform?: string;
  id: string;
  role: {
    name?: string;
    description?: string | null;
    permissions?: {
      [key: string]: boolean;
    };
    isDeletable?: boolean;
  };
}

export type HttpUpdateRoleResponse = HttpGetOneRoleResponse;

export interface HttpDeleteRoleRequest {
  platform?: string;
  id: string;
}

export type HttpDeleteRoleResponse = HttpGetOneRoleResponse;
