export interface JwtPayload {
    username: string;
    _id: number;
    expiration?: Date;
  }