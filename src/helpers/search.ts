import { UserInstance, SearchUsersResponse } from '../types/User';

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
