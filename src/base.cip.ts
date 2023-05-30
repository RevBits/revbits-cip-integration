import NotificationsApi from './apis/notifications.api';
import PermissionsApi from './apis/permissions.api';
import RolesApi from './apis/roles.api';
import UsersApi from './apis/users.api';
import {HttpCreateNotificationRequest,
  HttpCreateNotificationResponse,
  HttpDeleteNotificationResponse,
  HttpGetAllNotificationsRequest,
  HttpGetAllNotificationsResponse,
  HttpGetOneNotificationResponse,
  HttpReadNotificationResponse} from './interfaces/notification.interface';
import {HttpDeletePermissionResponse,
  HttpDeletePlatformPermissionsResponse,
  HttpGetAllPermissionsResponse,
  HttpGetOnePermissionResponse,
  HttpSyncPermissionsRequest,
  HttpSyncPermissionsResponse} from './interfaces/permission.interface';
import {HttpCreateBulkRolesRequest,
  HttpCreateBulkRolesResponse,
  HttpCreateRoleRequest,
  HttpCreateRoleResponse,
  HttpDeleteRoleResponse,
  HttpGetAllRolesRequest,
  HttpGetAllRolesResponse,
  HttpGetOneRoleResponse,
  HttpUpdateRoleRequest,
  HttpUpdateRoleResponse} from './interfaces/role.interface';
import { SOCKET_CALLBACK } from './interfaces/socket.interface';
import { CIP_OPTIONS, PLATFORM } from './interfaces/types.type';
import {Actor,
  HttpCheckUsersExistenceResponse,
  HttpCreateBulkUsersRequest,
  HttpCreateBulkUsersResponse,
  HttpCreateUserRequest,
  HttpCreateUserResponse,
  HttpDeleteUserResponse,
  HttpGetAllUsersRequest,
  HttpGetAllUsersResponse,
  HttpGetOneUserResponse,
  HttpRestoreUserResponse,
  HttpUpdateUserRequest,
  HttpUpdateUserResponse,
  HttpUploadUserAvatarResponse} from './interfaces/user.interface';
import { validateActor, validateBulkRecordsCount, validateRequiredParams, verifyVariableType } from './utils/helpers';

export abstract class BaseCIP {
  private userApi!: UsersApi;

  private roleApi!: RolesApi;

  private permissionApi!: PermissionsApi;

  private notificationApi!: NotificationsApi;

  constructor(
    protected cipBaseUrl: string,
    protected cipSocketPostfix: string,
    protected platform: PLATFORM,
    protected platformPrivKey: string,
    protected options: CIP_OPTIONS = {},
    protected socketCallback: SOCKET_CALLBACK | null | undefined,
  ) {
    this.validateParams();
    this.initApiServices();
  }

  private getUserApi(actor: Actor | null | undefined): UsersApi {
    return actor
      ? new UsersApi(this.cipBaseUrl, this.platform, this.platformPrivKey, this.options, actor)
      : this.userApi;
  }

  private getRoleApi(actor: Actor | null | undefined): RolesApi {
    return actor
      ? new RolesApi(this.cipBaseUrl, this.platform, this.platformPrivKey, this.options, actor)
      : this.roleApi;
  }

  private getPermissionApi(actor: Actor | null | undefined): PermissionsApi {
    return actor
      ? new PermissionsApi(this.cipBaseUrl, this.platform, this.platformPrivKey, this.options, actor)
      : this.permissionApi;
  }

  private getNotificationApi(actor: Actor | null | undefined): NotificationsApi {
    return actor
      ? new NotificationsApi(this.cipBaseUrl, this.platform, this.platformPrivKey, this.options, actor)
      : this.notificationApi;
  }

  public async getUsers(
    requestData: HttpGetAllUsersRequest,
    actor: Actor | null | undefined = null,
  ): Promise<HttpGetAllUsersResponse> {
    return this.getUserApi(actor).getAll(requestData);
  }

  public async getUser(id: string, actor: Actor | null | undefined = null): Promise<HttpGetOneUserResponse> {
    return this.getUserApi(actor).getOne(id);
  }

  public async getUserByUsername(
    username: string,
    actor: Actor | null | undefined = null,
  ): Promise<HttpGetOneUserResponse> {
    return this.getUserApi(actor).getOne('', username);
  }

  public async createUser(
    requestData: HttpCreateUserRequest,
    actor: Actor | null | undefined = null,
  ): Promise<HttpCreateUserResponse> {
    return this.getUserApi(actor).create(requestData);
  }

  public async createBulkUsers(
    requestData: HttpCreateBulkUsersRequest,
    actor: Actor | null | undefined = null,
  ): Promise<HttpCreateBulkUsersResponse> {
    validateBulkRecordsCount(requestData.users);
    return this.getUserApi(actor).createBulk(requestData);
  }

  public async updateUser(
    requestData: HttpUpdateUserRequest,
    actor: Actor | null | undefined = null,
  ): Promise<HttpUpdateUserResponse> {
    return this.getUserApi(actor).update(requestData);
  }

  public async uploadAvatar(
    filePath: string,
    actor: Actor | null | undefined = null,
  ): Promise<HttpUploadUserAvatarResponse> {
    validateActor(actor);
    return this.getUserApi(actor).uploadAvatar(filePath);
  }

  public async deleteUser(id: string, actor: Actor | null | undefined = null): Promise<HttpDeleteUserResponse> {
    return this.getUserApi(actor).delete(id);
  }

  public async checkUsersExistenceByUsernames(
    usernames: Array<string>,
    actor: Actor | null | undefined = null,
  ): Promise<HttpCheckUsersExistenceResponse> {
    return this.getUserApi(actor).checkUsersExistenceByUsernames(usernames);
  }

  public async restoreUser(id: string, actor: Actor | null | undefined = null): Promise<HttpRestoreUserResponse> {
    return this.getUserApi(actor).restore(id);
  }

  public async getRoles(
    requestData: HttpGetAllRolesRequest,
    actor: Actor | null | undefined = null,
  ): Promise<HttpGetAllRolesResponse> {
    return this.getRoleApi(actor).getAll(requestData);
  }

  public async getRole(id: string, actor: Actor | null | undefined = null): Promise<HttpGetOneRoleResponse> {
    return this.getRoleApi(actor).getOne(id);
  }

  public async createRole(
    requestData: HttpCreateRoleRequest,
    actor: Actor | null | undefined = null,
  ): Promise<HttpCreateRoleResponse> {
    return this.getRoleApi(actor).create(requestData);
  }

  public async createBulkRoles(
    requestData: HttpCreateBulkRolesRequest,
    actor: Actor | null | undefined = null,
  ): Promise<HttpCreateBulkRolesResponse> {
    validateBulkRecordsCount(requestData.roles);
    return this.getRoleApi(actor).createBulk(requestData);
  }

  public async updateRole(
    requestData: HttpUpdateRoleRequest,
    actor: Actor | null | undefined = null,
  ): Promise<HttpUpdateRoleResponse> {
    return this.getRoleApi(actor).update(requestData);
  }

  public async deleteRole(id: string, actor: Actor | null | undefined = null): Promise<HttpDeleteRoleResponse> {
    return this.getRoleApi(actor).delete(id);
  }

  public async getPermissions(actor: Actor | null | undefined = null): Promise<HttpGetAllPermissionsResponse> {
    return this.getPermissionApi(actor).getAll();
  }

  public async getPermission(
    key: string,
    actor: Actor | null | undefined = null,
  ): Promise<HttpGetOnePermissionResponse> {
    return this.getPermissionApi(actor).getOne(key);
  }

  public async syncPermissions(
    data: HttpSyncPermissionsRequest,
    actor: Actor | null | undefined = null,
  ): Promise<HttpSyncPermissionsResponse> {
    return this.getPermissionApi(actor).sync(data);
  }

  public async deletePermission(
    key: string,
    actor: Actor | null | undefined = null,
  ): Promise<HttpDeletePermissionResponse> {
    return this.getPermissionApi(actor).delete(key);
  }

  public async deletePlatformPermissions(
    actor: Actor | null | undefined = null,
  ): Promise<HttpDeletePlatformPermissionsResponse> {
    return this.getPermissionApi(actor).deletePlatformPermissions();
  }

  public async getNotifications(
    requestData: HttpGetAllNotificationsRequest | undefined,
    actor: Actor | null | undefined = null,
  ): Promise<HttpGetAllNotificationsResponse> {
    return this.getNotificationApi(actor).getAll(requestData);
  }

  public async getNotification(
    platformNotificationId: string,
    actor: Actor | null | undefined = null,
  ): Promise<HttpGetOneNotificationResponse> {
    return this.getNotificationApi(actor).getOne(platformNotificationId);
  }

  public async createNotification(
    requestData: HttpCreateNotificationRequest,
    actor: Actor | null | undefined = null,
  ): Promise<HttpCreateNotificationResponse> {
    return this.getNotificationApi(actor).create(requestData);
  }

  public async readNotification(platformNotificationId: string, actor: Actor): Promise<HttpReadNotificationResponse> {
    validateActor(actor);
    return this.getNotificationApi(actor).read(platformNotificationId);
  }

  public async deleteNotification(
    platformNotificationId: string,
    actor: Actor | null | undefined = null,
  ): Promise<HttpDeleteNotificationResponse> {
    return this.getNotificationApi(actor).delete(platformNotificationId);
  }

  private initApiServices(): void {
    this.userApi = new UsersApi(this.cipBaseUrl, this.platform, this.platformPrivKey, this.options);
    this.roleApi = new RolesApi(this.cipBaseUrl, this.platform, this.platformPrivKey, this.options);
    this.permissionApi = new PermissionsApi(this.cipBaseUrl, this.platform, this.platformPrivKey, this.options);
    this.notificationApi = new NotificationsApi(this.cipBaseUrl, this.platform, this.platformPrivKey, this.options);
  }

  private validateParams(): void {
    validateRequiredParams(['cipBaseUrl', 'cipSocketPostfix', 'platform', 'platformPrivKey'], this);

    verifyVariableType(this.cipBaseUrl, 'string', 'cipBaseUrl');
    verifyVariableType(this.cipSocketPostfix, 'string', 'cipSocketPostfix');
    verifyVariableType(this.platform, 'string', 'platform');
    verifyVariableType(this.platformPrivKey, 'string', 'platformPrivKey');
    verifyVariableType(this.options, 'object', 'options');

    if (this.socketCallback) {
      verifyVariableType(this.socketCallback, 'function', 'socketCallback');
    }
  }
}
