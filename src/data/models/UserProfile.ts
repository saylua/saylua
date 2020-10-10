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

class UserProfile extends Model {
  // @ts-ignore Property is used before its initialization
  public userId: string = this.userId;

  // @ts-ignore Property is used before its initialization
  public pronouns: string = this.pronouns;
}

UserProfile.init(
  {
    userId: {
      type: DataType.UUID,
      primaryKey: true,
    },

    pronouns: {
      type: DataType.STRING(255),
    },
  },
  { sequelize },
);

export default UserProfile;
