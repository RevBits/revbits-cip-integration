export class CIPError extends Error {
  public cip_errors: Array<any> = [];

  constructor(_message: string | null | undefined, cipResponse: any | undefined | null = null) {
    super(getErrorMessage(_message, cipResponse) || '');
    this.name = 'CIPError';
    if (cipResponse?.errors) {
      this.cip_errors = cipResponse.errors;
    }
    Object.setPrototypeOf(this, CIPError.prototype);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getErrorMessage(_message: string | null | undefined, response: any = null): string {
  let message = _message;
  if (response?.message) {
    message += ` CIP Server Error: ${response.message}`;
  }

  return message || '';
}
