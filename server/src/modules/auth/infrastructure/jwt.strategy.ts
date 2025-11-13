import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtPayload } from '../application/interfaces/jwt-payload.interface';
import type { CurrentUserData } from '../application/interfaces/current-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'paypros_secret_key',
    });
  }

  validate(payload: JwtPayload): CurrentUserData {
    return { userId: payload.sub, username: payload.user };
  }
}
