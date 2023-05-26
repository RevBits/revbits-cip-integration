import { HttpResponse } from './http.interface';
import { PLATFORM } from './types.type';

export interface Permission {
  type: string;
  key: string;
  level: number;
  name: string;
  module: string;
}

export interface HttpGetAllPermissionsRequest {
  platform?: PLATFORM;
}

export type HttpGetAllPermissionsResponse = HttpResponse<Array<Permission>>;

export interface HttpGetOnePermissionRequest {
  platform?: PLATFORM;
  key: string;
}

export type HttpGetOnePermissionResponse = HttpResponse<Permission>;

export interface HttpSyncPermissionsRequest {
  platform?: PLATFORM;
  permissions: Array<Permission>;
}

export type HttpSyncPermissionsResponse = HttpGetAllPermissionsResponse;

export interface HttpDeletePlatformPermissionsRequest {
  platform?: string;
}

export type HttpDeletePlatformPermissionsResponse = HttpResponse<number>;

export interface HttpDeletePermissionRequest {
  platform?: string;
  key: string;
}

export type HttpDeletePermissionResponse = HttpGetOnePermissionResponse;
