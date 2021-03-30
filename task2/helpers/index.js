export function getAutoSuggestUsers(users, loginSubstring, limit) {
  return users
    .filter((u) => u.login.includes(loginSubstring))
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, limit);
}
