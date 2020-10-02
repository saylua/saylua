/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React, { useContext } from 'react';
import cx from 'classnames';
import s from './Navigation.css';
import Link from '../Link';
import ApplicationContext from '../ApplicationContext';

export default function Navigation() {
  const { context } = useContext(ApplicationContext);
  if (!context.me) {
    (async () => {
      try {
        const response = await context.fetch('/api/me');
        const data = await response.json();
        context.setMe(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }

  const loginBox =
    context.me && context.me.username ? (
      <a className={cx(s.link)} href="/logout">
        Log out
      </a>
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
    );
  useStyles(s);
  return (
    <div className={s.root} role="navigation">
      <Link className={s.link} to="/about">
        About
      </Link>
      <Link className={s.link} to="/contact">
        Contact
      </Link>
      <span className={s.spacer}> | </span>
      {loginBox}
    </div>
  );
}
