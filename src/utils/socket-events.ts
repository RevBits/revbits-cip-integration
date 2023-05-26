import WebSocket from 'ws';
import { HttpGetOneUserResponse } from '../interfaces/user.interface';
import { HttpGetOneRoleResponse } from '../interfaces/role.interface';
import { logger } from './logger';
import { CIP } from '../cip';
import { ModelEvent, SOCKET_CALLBACK } from '../interfaces/socket.interface';
import { HttpGetOneNotificationResponse } from '../interfaces/notification.interface';
import { HttpGetOnePermissionResponse } from '../interfaces/permission.interface';

function emitSocketEvent(
  cipEvent: ModelEvent,
  apiResponse:
    | HttpGetOneRoleResponse
    | HttpGetOneUserResponse
    | HttpGetOnePermissionResponse
    | HttpGetOneNotificationResponse
    | { data: { id?: string; platformNotificationId?: string; key?: string } },
  socketCallback: SOCKET_CALLBACK,
) {
  if (apiResponse) {
    socketCallback({ event: `${cipEvent.action}-${cipEvent.model}`, cipEvent, data: apiResponse.data });
  }
}

function handleUserEvent(eventData: ModelEvent, socketCallback: SOCKET_CALLBACK, cipInstance: CIP): void {
  switch (eventData.action) {
    case 'updated':
    case 'created':
      cipInstance
        .getUser(eventData.id)
        .then((resp: HttpGetOneUserResponse) => {
          if (resp.return_code === 1000) {
            emitSocketEvent(eventData, resp, socketCallback);
          }
        })
        .catch(() => logger.error(`Error while fetching ${eventData.model} against id "${eventData.id}".`));
      break;
    case 'deleted':
      if (eventData.id) {
        emitSocketEvent(eventData, { data: { id: eventData.id } }, socketCallback);
      }
      break;
    default:
      logger.warn(`No Case defined for action ${eventData.action} in ${eventData.model} Model.`);
  }
}

function handleRoleEvent(eventData: ModelEvent, socketCallback: SOCKET_CALLBACK, cipInstance: CIP): void {
  switch (eventData.action) {
    case 'updated':
    case 'created':
      cipInstance
        .getRole(eventData.id)
        .then((resp: HttpGetOneRoleResponse) => {
          if (resp.return_code === 1000) {
            emitSocketEvent(eventData, resp, socketCallback);
          }
        })
        .catch(() => logger.error(`Error while fetching ${eventData.model} against id "${eventData.id}".`));
      break;
    case 'deleted':
      if (eventData.id) {
        emitSocketEvent(eventData, { data: { id: eventData.id } }, socketCallback);
      }
      break;
    default:
      logger.warn(`No Case defined for action ${eventData.action} in ${eventData.model} Model.`);
  }
}

function handlePermissionEvent(
  eventData: ModelEvent & { key: string },
  socketCallback: SOCKET_CALLBACK,
  cipInstance: CIP,
): void {
  switch (eventData.action) {
    case 'updated':
    case 'created':
      cipInstance
        .getPermission(eventData.key)
        .then((resp: HttpGetOnePermissionResponse) => {
          if (resp.return_code === 1000) {
            emitSocketEvent(eventData, resp, socketCallback);
          }
        })
        .catch(() => logger.error(`Error while fetching ${eventData.model} against key "${eventData.key}".`));
      break;
    case 'deleted':
      if (eventData.key) {
        emitSocketEvent(eventData, { data: { key: eventData.key } }, socketCallback);
      }
      break;
    default:
      logger.warn(`No Case defined for action ${eventData.action} in ${eventData.model} Model.`);
  }
}

function handleNotificationEvent(
  eventData: ModelEvent & { platformNotificationId: string },
  socketCallback: SOCKET_CALLBACK,
  cipInstance: CIP,
): void {
  switch (eventData.action) {
    case 'updated':
    case 'created':
      if (eventData.platformNotificationId) {
        cipInstance
          .getNotification(eventData.platformNotificationId)
          .then((resp: HttpGetOneNotificationResponse) => {
            if (resp.return_code === 1000) {
              emitSocketEvent(eventData, resp, socketCallback);
            }
          })
          .catch(() =>
            logger.error(
              `Error while fetching ${eventData.model} against platformNotificationId "${eventData.platformNotificationId}".`,
            ),
          );
      }
      break;
    case 'deleted':
      if (eventData.platformNotificationId) {
        emitSocketEvent(
          eventData,
          { data: { platformNotificationId: eventData.platformNotificationId } },
          socketCallback,
        );
      }
      break;
    default:
      logger.warn(`No Case defined for action ${eventData.action} in ${eventData.model} Model.`);
  }
}

export function sendSocketEventToConsumer(
  data: WebSocket.Data,
  socketCallback: SOCKET_CALLBACK,
  cipInstance: CIP,
): void {
  const eventData = JSON.parse(data.toString());
  if (eventData.action && eventData.model) {
    switch (eventData.model) {
      case 'user':
        handleUserEvent(eventData, socketCallback, cipInstance);
        break;
      case 'role':
        handleRoleEvent(eventData, socketCallback, cipInstance);
        break;
      case 'permission':
        handlePermissionEvent(eventData, socketCallback, cipInstance);
        break;
      case 'notification':
        handleNotificationEvent(eventData, socketCallback, cipInstance);
        break;
      default:
        logger.warn(`No Case defined for model ${eventData.model}.`);
    }
  }
}
