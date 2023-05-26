import WebSocket from 'ws';
import { CIP_OPTIONS, EVENT_CALLBACK, PLATFORM } from '../interfaces/types.type';
import SocketApi from '../apis/socket.api';
import { logger } from '../utils/logger';

export class WebSocketClient {
  private websocket: WebSocket | null;

  private currentReconnectAttempts: number;

  private reconnectInterval: number;

  private reconnectAttempts: number;

  constructor(
    public baseUrl: string,
    public url: string,
    public platform: PLATFORM,
    public platformPrivKey: string,
    public options: CIP_OPTIONS,
    public cb: EVENT_CALLBACK,
    public initialReconnectInterval: number = 100,
    public maxReconnectInterval: number = 20000,
    public maxReconnectAttempts: number = 10,
  ) {
    this.websocket = null;
    this.currentReconnectAttempts = 0;
    this.reconnectInterval = initialReconnectInterval;
    this.reconnectAttempts = maxReconnectAttempts;

    this.connect();
  }

  private async connect() {
    try {
      const socketToken = await this.generateSocketToken();
      if (socketToken) {
        const url = `${this.url}/${socketToken}`;
        this.websocket = new WebSocket(url);

        this.websocket.on('open', this.handleOpen);
        this.websocket.on('message', this.handleMessage);
        this.websocket.on('close', this.handleClose);
        this.websocket.on('error', this.handleError);
      }
    } catch (error: any) {
      logger.error('Error generating socket token:', error);

      if (this.currentReconnectAttempts < this.reconnectAttempts) {
        const delay = Math.min(this.reconnectInterval, this.maxReconnectInterval);
        logger.info('Attempting to reconnect in', delay / 1000, 'seconds...');
        this.currentReconnectAttempts++;
        this.reconnectInterval *= 2;
        setTimeout(() => this.connect(), delay);
      } else {
        logger.info('Exceeded the maximum number of reconnect attempts.');
      }
    }
  }

  private async generateSocketToken(): Promise<string | undefined> {
    const socketApi = new SocketApi(this.baseUrl, this.platform, this.platformPrivKey, this.options);

    return socketApi.generateSocketToken();
  }

  private handleOpen = (): void => {
    this.currentReconnectAttempts = 0;
    this.reconnectInterval = 100;
    logger.info('WebSocket connection established.');
  };

  private handleMessage = (data: WebSocket.Data): void => {
    logger.info('Received message:', data.toString());
    this.cb(data);
  };

  private handleClose = (code: number, reason: string): void => {
    if (code === 1000) {
      logger.info('WebSocket connection closed gracefully.');
      return;
    }

    logger.info('WebSocket connection closed with code:', code, 'and reason:', reason);

    if (this.currentReconnectAttempts < this.reconnectAttempts) {
      const delay = Math.min(this.reconnectInterval, this.maxReconnectInterval);
      logger.info('Attempting to reconnect in', delay / 1000, 'seconds...');
      this.currentReconnectAttempts++;
      this.reconnectInterval *= 2;
      setTimeout(() => this.connect(), delay);
    } else {
      logger.info('Exceeded the maximum number of reconnect attempts.');
    }
  };

  private handleError = (error: Error): void => {
    logger.error('WebSocket encountered an error:', error);
  };

  private send(message: string): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(message);
    } else {
      logger.warn('WebSocket is not open. Message not sent:', message);
    }
  }

  public disconnect(): void {
    if (this.websocket) {
      this.websocket.close(1000, 'Disconnect requested.');
    }
  }
}
