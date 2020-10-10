/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './Register.css';

const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $email: String!
    $pronouns: String
  ) {
    databaseCreateUser(
      username: $username
      password: $password
      email: $email
      profile: { pronouns: $pronouns }
    ) {
      username
    }
  }
`;

type PropTypes = {
  title: string;
};

const Register = (props: PropTypes) => {
  useStyles(s);

  const [createUser] = useMutation<any>(CREATE_USER);

  const formRef: React.RefObject<any> = useRef(null);
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef || !formRef.current) return;
    const inputs = formRef.current.elements;
    createUser({
      variables: {
        username: inputs.namedItem('username').value,
        email: inputs.namedItem('email').value,
        password: inputs.namedItem('password').value,
        pronouns: inputs.namedItem('pronouns').value,
      },
    });
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{props.title}</h1>
        <p className={s.lead}>Register to adopt sprites!</p>
        <form method="post" ref={formRef} onSubmit={submitHandler}>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="username">
              Username:
              <input
                className={s.input}
                id="username"
                type="text"
                name="username"
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                required
              />
            </label>
          </div>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="email">
              Email:
              <input
                className={s.input}
                id="email"
                type="text"
                name="email"
                required
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
                required
              />
            </label>
          </div>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="pronouns">
              Pronouns:
              <input
                className={s.input}
                id="pronouns"
                type="text"
                name="pronouns"
              />
            </label>
          </div>
          <div className={s.formGroup}>
            <button className={s.button} type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
