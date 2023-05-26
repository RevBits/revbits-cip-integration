import { HttpPaginatedResponse, HttpResponse } from './http.interface';
import { PLATFORM } from './types.type';

export interface UserRoles {
  [key: string]: boolean;
}

export interface UserPlatformAccess {
  [key: string]: boolean;
  dt_enabled: boolean;
  es_enabled: boolean;
  pp_enabled: boolean;
  up_enabled: boolean;
  eps_enabled: boolean;
  pam_enabled: boolean;
}

export interface Actor {
  id: string;
  username: string;
}

export interface User {
  id: string;
  name: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  usersalt: string;
  avatar: string | null | undefined;
  is_active: 0 | 1;
  is_verified: 0 | 1;
  roles: UserRoles;
  platform_access: UserPlatformAccess;
  createdAt: Date;
  updatedAt: Date;
  activation_time: Date | null | undefined;
  phoneNumber: string | null | undefined;
  smsEnabled: boolean;
  twoFactorPriority: ['otp', 'sms', 'u2f', 'mbl'] | Array<string>;
  otpEnabled: boolean;
  securityKeyEnabled: boolean;
  mblEnabled: boolean;
  deviceId: null;
  verification_random: string | null | undefined;
  isAzureAdUser: boolean;
  online: boolean;
  isSamlEnabled: boolean;
  smsOtpRetries: number;
  securityKeyData: Array<any>;
}

type UserSortableKeys = {
  [K in keyof User]: User[K] extends string | number ? K : never;
}[keyof User];

interface UserQueryParams {
  username?: string;
  firstname?: string;
  lastname?: string;
  verified?: boolean;
  active?: boolean;
}

export interface HttpGetAllUsersRequest {
  platform?: PLATFORM;
  page?: number;
  sort?: UserSortableKeys;
  direction?: string;
  perPage?: number;
  query?: UserQueryParams;
  search?: string;
}

export type HttpGetAllUsersResponse = HttpPaginatedResponse<User>;

export interface HttpGetOneUserRequest {
  platform?: PLATFORM;
  id: string;
}

export type HttpGetOneUserResponse = HttpResponse<User>;

export interface HttpCreateUserRequest {
  platform?: PLATFORM;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    usersalt: string;
    roles: UserRoles;
    logonname?: string;
    is_active?: boolean;
    is_verified?: boolean;
    platform_access?: UserPlatformAccess;
    deviceId?: string;
    deviceType?: string;
    phoneNumber?: string;
    smsEnabled?: boolean;
    azureAdUserId?: string;
    verification_random?: string;
    forgotpass_token?: string;
    twofactor_stat?: number;
    twofactor_secret?: string;
    notes?: string;
    key_stack?: string;
    activation_time?: Date;
    verification_time?: Date;
    activatedAt?: Date;
    verifiedAt?: Date;
    smsSecret?: string;
    twoFactorPriority?: Array<string>;
    otpEnabled?: boolean;
    otpSecret?: string;
    securityKeyData?: Array<any>;
    securityKeyChallenge?: string;
    mblEnabled?: boolean;
    smsOtpRetries?: number;
    isSamlEnabled?: boolean;
  };
}

export type HttpCreateUserResponse = HttpGetOneUserResponse;

export interface HttpUpdateUserRequest {
  platform?: PLATFORM;
  user: {
    id: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    password?: string;
    usersalt?: string;
    roles?: UserRoles;
    logonname?: string;
    is_active?: boolean;
    is_verified?: boolean;
    platform_access?: UserPlatformAccess;
    deviceId?: string;
    deviceType?: string;
    phoneNumber?: string;
    smsEnabled?: boolean;
    azureAdUserId?: string;
    verification_random?: string;
    forgotpass_token?: string;
    twofactor_stat?: number;
    twofactor_secret?: string;
    notes?: string;
    key_stack?: string;
    activation_time?: Date;
    verification_time?: Date;
    activatedAt?: Date;
    verifiedAt?: Date;
    smsSecret?: string;
    twoFactorPriority?: Array<string>;
    otpEnabled?: boolean;
    otpSecret?: string;
    securityKeyData?: Array<any>;
    securityKeyChallenge?: string;
    mblEnabled?: boolean;
    smsOtpRetries?: number;
    isSamlEnabled?: boolean;
  };
}

export type HttpUpdateUserResponse = HttpGetOneUserResponse;

export interface HttpDeleteUserRequest {
  platform?: PLATFORM;
  id: string;
}

export type HttpDeleteUserResponse = HttpGetOneUserResponse;

export interface HttpRestoreUserRequest {
  platform?: PLATFORM;
  id: string;
}

export type HttpRestoreUserResponse = HttpGetOneUserResponse;
