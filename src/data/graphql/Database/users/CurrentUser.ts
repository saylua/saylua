export const queries = [
  `
  # Retrieves information about the currently logged-in user
  currentUser: DatabaseUser
`,
];

export const resolvers = {
  RootQuery: {
    async currentUser(parent: any, args: any, context: any) {
      return context.getUser();
    },
  },
};
