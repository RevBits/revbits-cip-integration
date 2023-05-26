import { HttpPaginatedResponse, HttpResponse } from './http.interface';
import { PLATFORM, PLATFORM_UPPER_CASE } from './types.type';

export interface Notification {
  id: string;
  event: string;
  entityId: string;
  platformNotificationId: string;
  platform: PLATFORM_UPPER_CASE;
  sourceId: string | null;
  entityType: string;
  entityName: string | null;
  notificationType: string;
  notification: string;
  pageUrl: string;
  actionBy: string;
  severity: string;
  deletedAt: Date | null;
  timezone: string;
}

export interface NotificationUser {
  id: string;
  notificationId: string;
  userId: string;
  createdAt: Date;
  readAt: Date | null;
  deletedAt: Date | null;
  receiver: string;
  notification: Notification;
}

export interface HttpGetAllNotificationsRequest {
  platform?: PLATFORM;
  page?: 1;
  perPage?: 250;
  query?: {
    startDate?: Date;
    endDate?: Date;
    severity?: ['critical', 'medium', 'high', 'low', 'note'];
    platformType?: PLATFORM_UPPER_CASE;
    type?: 'read' | 'unread';
    userIds?: Array<string>;
    filterText?: string;
  };
}

export type HttpGetAllNotificationsResponse = HttpPaginatedResponse<Notification>;

export interface HttpGetOneNotificationRequest {
  platform?: PLATFORM;
  platformNotificationId: string;
}

export type HttpGetOneNotificationResponse = HttpResponse<Notification>;

export interface HttpDeleteNotificationRequest {
  platform?: PLATFORM;
  platformNotificationId: string;
}

export type HttpDeleteNotificationResponse = HttpGetOneNotificationResponse;

export interface HttpCreateNotificationRequest {
  platform?: PLATFORM;
  notification: {
    id: string;
    event: string;
    entityId: string;
    sourceId: string | null | undefined;
    entityName: string;
    entityType: string;
    severity: string;
    notificationType: string;
    notification: string;
    actionBy: string;
    deletedAt: Date | null | undefined;
    receivers: Array<string>;
    pageUrl: string;
    platform: PLATFORM_UPPER_CASE;
    createdAt: Date | null | undefined;
  };
}

export type HttpCreateNotificationResponse = HttpGetOneNotificationResponse;

export interface HttpReadNotificationRequest {
  platform?: PLATFORM;
  platformNotificationId: string;
}

export type HttpReadNotificationResponse = HttpResponse<boolean>;
