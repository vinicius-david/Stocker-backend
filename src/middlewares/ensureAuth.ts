import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface JWTPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 403);
  }

  const [, token] = authHeader.split(' ');

  const { secret } = authConfig;

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as JWTPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token.', 403);
  }
}
