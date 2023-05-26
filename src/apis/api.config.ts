export const API_CONFIG = {
  API_URL: 'api/v2',
  USER_AGENT: 'Shared Auth Agent',
  ACCEPT: 'application/json',
  CONTENT_TYPE: 'application/json',
  AUTHORIZATION: (jwtToken: string) => `Bearer ${jwtToken}`,
  DEFAULT_TIMEOUT: 10000,
  DEFAULT_REJECT_UNAUTH: false,
};

export const API_ENDPOINTS = {
  WEB_SOCKET: { GENERATE_SOCKET_TOKEN: 'GenerateSocketToken' },
  USER: {
    GET_ALL: 'users/GetUsers',
    GET_ONE: 'users/GetOneUser',
    CREATE: 'users/CreateUser',
    UPDATE: 'users/UpdateUser',
    DELETE: 'users/DeleteUser',
    RESTORE: 'users/RestoreUser',
  },
  ROLE: {
    GET_ALL: 'roles/GetRoles',
    GET_ONE: 'roles/GetOneRole',
    CREATE: 'roles/CreateRole',
    UPDATE: 'roles/UpdateRole',
    DELETE: 'roles/DeleteRole',
  },
  PERMISSION: {
    GET_ALL: 'permissions/GetPermissions',
    GET_ONE: 'permissions/GetOnePermission',
    SYNC: 'permissions/SyncPermissions',
    DELETE: 'permissions/DELETE',
    DELETE_PLATFORM: 'permissions/DeletePlatformPermissions',
  },
  NOTIFICATION: {
    GET_ALL: 'notifications/GetNotifications',
    GET_ONE: 'notifications/GetOneNotification',
    CREATE: 'notifications/CreateNotification',
    READ: 'notifications/ReadNotification',
    DELETE: 'notifications/DeleteNotification',
  },
};
