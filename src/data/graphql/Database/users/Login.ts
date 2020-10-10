export const mutation = [
  `
  # Log in a user using a username
  login(
    # The username of the user
    username: String!

    # The password of the user
    password: String!
  ): DatabaseUser
  `,
  `
  # Log in a user using an email
  loginWithEmail(

    # The email of the user
    email: String!

    # The password of the user
    password: String!
  ): DatabaseUser
  `,
  `
  # Logout
  logout: DatabaseUser
  `,
];

export const resolvers = {
  Mutation: {
    login: async (
      _parent: any,
      { username, password }: { username: string; password: string },
      context: any,
    ) => {
      const { user } = await context.authenticate('graphql-local', {
        username,
        password,
      });
      await context.login(user);
      return user;
    },
    logout: (_parent: any, _args: any, context: any) => context.logout(),
  },
};
