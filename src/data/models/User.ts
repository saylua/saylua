/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * TODO(Mike): Remove initializers once this bug is fixed
 * https://github.com/sequelize/sequelize/issues/10579
 */

import DataType, { Model } from 'sequelize';
import sequelize from '../sequelize';

class User extends Model {
  // @ts-ignore Property is used before its initialization
  public id: string = this.id;

  // @ts-ignore Property is used before its initialization
  public username: string = this.username;

  // @ts-ignore Property is used before its initialization
  public passwordHash: string = this.passwordHash;

  // @ts-ignore Property is used before its initialization
  public passwordSalt: string = this.passwordSalt;

  // @ts-ignore Property is used before its initialization
  public email: string = this.email;

  // @ts-ignore Property is used before its initialization
  public emailConfirmed: boolean = this.emailConfirmed;

  // @ts-ignore Property is used before its initialization
  public readonly createdAt: Date = this.createdAt;

  // @ts-ignore Property is used before its initialization
  public readonly updatedAt: Date = this.updatedAt;
}

User.init(
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },

    username: {
      type: DataType.STRING(100),
      unique: true,
    },

    passwordHash: {
      type: DataType.STRING(255),
    },

    passwordSalt: {
      type: DataType.STRING(255),
    },

    email: {
      type: DataType.STRING(255),
      unique: true,
      validate: { isEmail: true },
    },

    emailConfirmed: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    indexes: [{ fields: ['email', 'username'] }],
  },
);

export default User;
