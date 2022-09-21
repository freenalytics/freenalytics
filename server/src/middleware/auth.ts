import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { JWT_SECRET, JWT_DURATION } from '../config';

passport.use(new LocalStrategy({ session: false }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const jwtStrategyParams = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

// TODO: Need to type payload.
passport.use(new JwtStrategy(jwtStrategyParams, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);

    if (!user) {
      return done(null, null);
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// TODO: Need to type payload.
export const createJwtToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_DURATION });
};

export const verifyUser = passport.authenticate('jwt', { session: false });
export const localAuthenticate = passport.authenticate('local', { session: false });
