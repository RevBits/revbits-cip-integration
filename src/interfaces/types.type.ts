import WebSocket from 'ws';

export type PLATFORM = 'pam' | 'eps' | 'ztn' | 'es' | 'dt' | 'pp' | string;
export type PLATFORM_UPPER_CASE = 'PAM' | 'EPS' | 'ZTN' | 'ES' | 'DT' | 'PP' | string;
export type EVENT_CALLBACK = (_event: WebSocket.Data) => void;
export type CIP_OPTIONS = {
  tlsRejectUnauthorized?: boolean;
  timeout?: number;
};
