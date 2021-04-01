import { v4 as uuidv4 } from 'uuid';
import { User } from 'types/User';

export function getAutoSuggestUsers(users: User[], loginSubstring: string, limit: number): User[] {
  return users
    .filter((u) => u.login.includes(loginSubstring))
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, limit);
}

export function createUser(login: string, password: string, age: number): User {
  return ({
    id: uuidv4(),
    login,
    password,
    age,
    isDeleted: false,
  });
}

export function updateUser(user: User, fieldsToUpdate : Partial<User>): User {
  return ({
    ...user,
    ...fieldsToUpdate,
  });
}
