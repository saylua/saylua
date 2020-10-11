/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import s from './Login.css';

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      profile {
        pronouns
      }
    }
  }
`;

type PropTypes = {
  title: string;
};

const Login = (props: PropTypes) => {
  useStyles(s);

  const [login] = useMutation<any>(LOGIN_USER);

  // TODO(Mike): Replace this form logic with Formik or similar in the future.
  const formRef: React.RefObject<any> = useRef(null);
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef || !formRef.current) return;
    const inputs = formRef.current.elements;
    login({
      variables: {
        username: inputs.namedItem('usernameOrEmail').value,
        password: inputs.namedItem('password').value,
      },
    });
  };
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{props.title}</h1>
        <p className={s.lead}>Log in with your username or email address.</p>
        <form method="post" ref={formRef} onSubmit={submitHandler}>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="usernameOrEmail">
              Username or email address:
              <input
                className={s.input}
                id="usernameOrEmail"
                type="text"
                name="usernameOrEmail"
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
              />
            </label>
          </div>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="password">
              Password:
              <input
                className={s.input}
                id="password"
                type="password"
                name="password"
              />
            </label>
          </div>
          <div className={s.formGroup}>
            <button className={s.button} type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
