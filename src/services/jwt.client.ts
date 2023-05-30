import * as JWT from 'jsonwebtoken';
import { PLATFORM } from '../interfaces/types.type';
import { JWT_CONFIG } from '../utils/config';
import { Actor, User } from '../interfaces/user.interface';
import { JWTSignBody } from '../interfaces/jwt.interface';

export class JWTClient {
  constructor(public platform: PLATFORM, public privKey: string, public actor: Actor | null | undefined = null) {}

  public getJWT(user: User | null = null): string {
    const { PLATFORM_JWT_EXPIRY } = JWT_CONFIG;
    const expiresIn = parseInt(PLATFORM_JWT_EXPIRY, 10);
    const body: JWTSignBody = { platform: this.platform };
    if (user && user?.username) {
      body.username = user.username;
    } else if (this.actor && this.actor?.username) {
      body.username = this.actor.username;
    }

    return JWT.sign(body, this.privKey, {
      expiresIn,
      algorithm: 'RS256',
    });
  }
}
