import { HttpResponse } from './http.interface';
import { Permission } from './permission.interface';
import { Role } from './role.interface';
import { PLATFORM } from './types.type';
import { User } from './user.interface';

export interface ModelEvent {
  id: string;
  fields: { firstname: true; roles: true };
  model: 'user' | 'role' | 'permission' | 'notification';
  action: 'created' | 'updated' | 'deleted';
}

interface EMIT_SOCKET_EVENT {
  cipEvent: ModelEvent;
  event: string;
  data:
    | User
    | Role
    | Permission
    | Notification
    | { id?: string; platformNotificationId?: string; key?: string }
    | undefined;
}

export type SOCKET_CALLBACK = (_event: EMIT_SOCKET_EVENT) => void;

export interface HttpGenerateSocketTokenRequest {
  platform: PLATFORM;
}

interface GenerateSocketTokenResponse {
  wsToken: string;
}

export type HttpGenerateSocketTokenResponse = HttpResponse<GenerateSocketTokenResponse>;
