/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import LocalStrategy from 'passport-local';
import dotenv from 'dotenv';
import User from './data/models/User';
import { validPassword } from './utils/auth';

dotenv.config();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    let user;
    try {
      user = await User.findOne({ where: { username } });
    } catch (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (!validPassword(password, user.passwordHash, user.passwordSalt)) {
      return done(null, false);
    }
    return done(null, user);
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user;
  try {
    user = await User.findOne({ where: { id } });
  } catch (err) {
    return done(err);
  }
  return done(null, user);
});

export default passport;
