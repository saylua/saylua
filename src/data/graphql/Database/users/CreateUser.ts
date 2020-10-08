import { User, UserProfile } from '../../../models';
import { genPassword } from '../../../../utils/auth';

export const schema = [
  `
  # User profile data for creating a new local database user account
  input UserProfile {

    # The user's pronouns
    pronouns: String
  }
`,
];

export const mutation = [
  `
  # Creates a new user and profile in the local database
  databaseCreateUser(
    # The username of the new user, must be unique
    username: String!

    # The password of the new user
    password: String!

    # The email of the new user, must be unique
    email: String!

    # User profile information for creating a new local database user account
    profile: UserProfile!
  ): DatabaseUser
`,
];

export const resolvers = {
  Mutation: {
    async databaseCreateUser(parent: any, args: any) {
      // If user already exists, throw error
      const lookupUser = await User.findOne({ where: { email: args.email } });

      if (lookupUser) {
        // eslint-disable-next-line no-throw-literal
        throw 'User already exists!';
      }

      // Create new user with profile in database
      const { salt, hash } = genPassword(args.password);
      const user = await User.create(
        {
          username: args.username,
          passwordHash: hash,
          passwordSalt: salt,
          email: args.email,
          profile: {
            ...args.profile,
          },
        },
        {
          include: [{ model: UserProfile, as: 'profile' }],
        },
      );

      return user;
    },
  },
};
