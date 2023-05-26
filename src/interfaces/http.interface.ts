/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse<R> {
  errors?: Array<any>;
  message?: string;
  code: string;
  return_code: number;
  data?: R;
}

export interface HttpPaginatedResponse<R> {
  errors?: Array<any>;
  message?: string;
  code: string;
  return_code: number;
  total?: number;
  perPage?: number;
  currentPage?: number;
  path?: string;
  firstPageUrl?: string;
  lastPage?: number;
  lastPageUrl?: string;
  nextPageUrl?: string;
  prevPageUrl?: string;
  from?: number;
  to?: number;
  data?: Array<R>;
}
