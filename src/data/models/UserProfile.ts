/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType, { Model } from 'sequelize';
import sequelize from '../sequelize';

class UserProfile extends Model {
  public userId!: string;

  public pronouns!: string;
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
