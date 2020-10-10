import merge from 'lodash.merge';

/** * Queries ** */
import {
  schema as GetAllUsers,
  queries as GetAllUsersQueries,
  resolvers as GetAllUsersResolver,
} from './users/GetAllUsers';

import {
  queries as CurrentUserQueries,
  resolvers as CurrentUserResolver,
} from './users/CurrentUser';

/** * Mutations ** */
import {
  schema as CreateUserInput,
  mutation as CreateUser,
  resolvers as CreateUserResolver,
} from './users/CreateUser';

import { mutation as Login, resolvers as LoginResolver } from './users/Login';

export const schema = [...GetAllUsers, ...CreateUserInput];

export const queries = [...GetAllUsersQueries, ...CurrentUserQueries];

export const mutations = [...CreateUser, ...Login];

export const resolvers = merge(
  GetAllUsersResolver,
  CurrentUserResolver,
  CreateUserResolver,
  LoginResolver,
);
