import { UserInstance, SearchUsersResponse } from '../types';

export function searchMapper({
  rows,
  count,
}: {
  rows: UserInstance[],
  count: number,
}):SearchUsersResponse {
  return ({
    total: count,
    users: rows,
  });
}
