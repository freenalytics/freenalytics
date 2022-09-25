import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import User, { UserJwtPayload, UserModel } from '../models/user';
import { getUserById } from '../services/userService';
import { UnauthorizedRequestError } from '../errors/http';
import { JWT_SECRET, JWT_TOKEN_DURATION } from '../config';

passport.use(new LocalStrategy({ session: false }, User.authenticate()));
passport.serializeUser(User.serializeUser() as any);
passport.deserializeUser(User.deserializeUser());

const jwtStrategyParams = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false
};

passport.use(new JwtStrategy(jwtStrategyParams, async (payload: UserJwtPayload, done) => {
  try {
    return done(null, await getUserById(payload.id));
  } catch (error) {
    return done(error, null);
  }
}));

export const createJwtToken = (payload: UserJwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_TOKEN_DURATION });
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (error: Error, _, info: Error | Error[]) => {
    if (error || info) {
      if (error) {
        return next(new UnauthorizedRequestError(error.message));
      }

      const infoError = Array.isArray(info) ? info[0] : info;
      if (infoError) {
        return next(new UnauthorizedRequestError(infoError.message));
      }
    }

    next();
  })(req, res, next);
};
export const localAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', { session: false }, (error: Error, user: UserModel, info: Error | Error[]) => {
    if (error || info) {
      if (error) {
        return next(new UnauthorizedRequestError(error.message));
      }

      const infoError = Array.isArray(info) ? info[0] : info;
      if (infoError) {
        return next(new UnauthorizedRequestError(infoError.message));
      }
    }

    req.user = user;
    next();
  })(req, res, next);
};
