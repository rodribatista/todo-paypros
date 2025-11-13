export interface JwtPayload {
  sub: string;
  user: string;
  iat?: number;
  exp?: number;
}
