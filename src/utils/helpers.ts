import { API_CONFIG } from '../apis/api.config';
import { HttpCreateRole } from '../interfaces/role.interface';
import { Actor, HttpCreateUser } from '../interfaces/user.interface';
import { CIPError } from './errors';

export function validateRequiredParams(params: (keyof any)[], instance: any): void {
  const missingParams: string[] = params.filter((param) => !instance[param]) as string[];

  if (missingParams.length > 0) {
    throw new CIPError(`Missing required parameter(s): ${missingParams.join(', ')}`);
  }
}

export function verifyVariableType(variable: any, expectedType: string, variableName: string): void {
  if (typeof variable !== expectedType) {
    throw new CIPError(
      `Invalid type for variable '${variableName}'. Expected type '${expectedType}', but received type '${typeof variable}'`,
    );
  }
}

export function generateWebSocketURL(baseUrl: string, socketPostfix: string): string {
  const url = new URL(baseUrl);

  if (url && url.hostname) {
    const hostname = url.hostname;
    return `wss://${hostname}${socketPostfix}`;
  }

  throw new CIPError('Socket URL could not be generated');
}

export function validateActor(actor: Actor | null | undefined): void {
  if (!(actor && typeof actor === 'object' && actor.username)) {
    throw new CIPError('Actor is required.');
  }
}

export function validateBulkRecordsCount(data: Array<HttpCreateUser | HttpCreateRole>): void {
  if (!(Array.isArray(data) && data.length <= API_CONFIG.MAX_ALLOWED_BULK_RECORDS_PER_REQUEST)) {
    throw new CIPError(`Maximum ${API_CONFIG.MAX_ALLOWED_BULK_RECORDS_PER_REQUEST} records are allowed per request.`);
  }
}
