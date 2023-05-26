import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import https from 'https';

import { CIP_OPTIONS, PLATFORM } from '../interfaces/types.type';
import { API_CONFIG } from './api.config';
import { CIPError } from '../utils/errors';

export abstract class BaseApi {
  private api: AxiosInstance;

  constructor(
    public baseUrl: string,
    public options: CIP_OPTIONS,
    public platform: PLATFORM,
    public getJwt: () => string,
  ) {
    this.api = axios.create({
      baseURL: `${this.baseUrl}/${API_CONFIG.API_URL}`,
      headers: {
        'User-Agent': API_CONFIG.USER_AGENT,
        Accept: API_CONFIG.ACCEPT,
        'Content-Type': API_CONFIG.CONTENT_TYPE,
        Authorization: API_CONFIG.AUTHORIZATION(getJwt()),
      },
      httpsAgent: new https.Agent({rejectUnauthorized: options.tlsRejectUnauthorized || API_CONFIG.DEFAULT_REJECT_UNAUTH}),
      timeout: options.timeout || API_CONFIG.DEFAULT_TIMEOUT,
    });
  }

  protected updateJWT(jwtToken: string): void {
    this.api.defaults.headers.Authorization = API_CONFIG.AUTHORIZATION(jwtToken);
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.request<T>(config);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new CIPError(`API request failed: ${error.message}`);
    }
  }

  protected async get<P, T>(url: string, params?: P): Promise<T> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url,
      params,
    };

    return this.request<T>(config);
  }

  protected async post<D, T>(url: string, data?: D): Promise<T> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
    };

    return this.request<T>(config);
  }

  private getRequestData<T extends { platform?: string }>(data: T | undefined) {
    let requestData: T;
    if (data) {
      requestData = { ...data, platform: this.platform };
    } else {
      requestData = { platform: this.platform } as T;
    }

    return requestData;
  }

  private resolveResponse<R extends { return_code: number }>(response: R, errorMessage: string) {
    if (response?.return_code === 1000) {
      return response;
    }

    throw new CIPError(errorMessage, response);
  }

  protected async sendApiRequest<T extends { platform?: string | undefined }, U extends { return_code: number }>(
    endpoint: string,
    requestData: T | undefined,
    errorMessage: string,
  ): Promise<U> {
    const response = await this.post<T, U>(endpoint, this.getRequestData<T>(requestData));

    return this.resolveResponse<U>(response, errorMessage);
  }
}
