/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { ComponentType } from 'react';
import cx from 'classnames';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './Navigation.css';
import Link from '../Link';

import {
  useUserContextQuery,
  useLogoutMutation,
} from '../../__generated__/dataBinders';

const Navigation: ComponentType<{}> = () => {
  useStyles(s);

  const { data } = useUserContextQuery();
  const [logoutUser, { client }] = useLogoutMutation();
  const username = data && data.currentUser && data.currentUser.username;

  const logout = async () => {
    await logoutUser();
    client.resetStore();
  };

  return (
    <div className={s.root} role="navigation">
      <Link className={s.link} to="/about">
        About
      </Link>
      <Link className={s.link} to="/contact">
        Contact
      </Link>
      <span className={s.spacer}> | </span>
      {username ? (
        <>
          <span>Hello: {username}</span>
          <button type="button" onClick={logout}>
            Log out
          </button>
        </>
      ) : (
        <>
          <Link className={s.link} to="/login">
            Log in
          </Link>
          <span className={s.spacer}>or</span>
          <Link className={cx(s.link, s.highlight)} to="/register">
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default Navigation;
