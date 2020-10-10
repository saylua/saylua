/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import passport from 'passport';
import { GraphQLLocalStrategy } from 'graphql-passport';

import { User } from './data/models';
import { validPassword } from './utils/auth';

passport.use(new GraphQLLocalStrategy(async (username: any, password: any,
    done: (error?: Error, user?: User) => void) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return done(new Error('User not found'));
  }
  if (!validPassword(password, user.passwordHash, user.passwordSalt)) {
    return done(new Error('Invalid password'));
  }
  return done(undefined, user);
}));

passport.serializeUser((user: User, done: (error?: Error, id?: string) => void) => {
  done(undefined, user.id);
});

passport.deserializeUser(async (id: string, done: (error?: Error, user?: User) => void) => {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return done(new Error('User not found'));
  }
  return done(undefined, user);
});

export default passport;
