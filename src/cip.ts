import WebSocket from 'ws';
import { CIP_OPTIONS, PLATFORM } from './interfaces/types.type';
import { generateWebSocketURL } from './utils/helpers';
import { WebSocketClient } from './services/web-socket.client';
import { logger } from './utils/logger';
import { BaseCIP } from './base.cip';
import { sendSocketEventToConsumer } from './utils/socket-events';
import { SOCKET_CALLBACK } from './interfaces/socket.interface';

export class CIP extends BaseCIP {
  constructor(
    public cipBaseUrl: string,
    public cipSocketPostfix: string,
    public platform: PLATFORM,
    public platformPrivKey: string,
    public options: CIP_OPTIONS = {},
    public socketCallback: SOCKET_CALLBACK | null | undefined,
  ) {
    super(cipBaseUrl, cipSocketPostfix, platform, platformPrivKey, options, socketCallback);
    this.connectSocket();
  }

  private eventCallback(data: WebSocket.Data): void {
    if (this.socketCallback) {
      sendSocketEventToConsumer(data, this.socketCallback, this);
    }
  }

  private connectSocket(): void {
    if (this.socketCallback) {
      const socketUrl = generateWebSocketURL(this.cipBaseUrl, this.cipSocketPostfix);
      const { cipBaseUrl, platform, platformPrivKey, options, eventCallback } = this;

      logger.info('Connecting to WebSocket...');
      new WebSocketClient(cipBaseUrl, socketUrl, platform, platformPrivKey, options, eventCallback.bind(this));
    }
  }
}
