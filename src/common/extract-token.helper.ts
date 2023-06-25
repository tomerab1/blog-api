import { Request } from 'express';

export const extracTokenFromHeaders = (request: Request) => {
  const [_, token] = request.headers.authorization?.split(' ') ?? [];
  return token;
};
