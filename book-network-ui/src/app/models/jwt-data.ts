export interface JwtData {
  fullName: string,
  sub: string,
  iat: number,
  exp: number,
  authorities: string[]
}
