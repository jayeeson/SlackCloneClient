export const getLocalStorageActiveServer = (username: string) => {
  return parseInt(localStorage.getItem(`chatClient#activeServer@${username}`) ?? '0', 10);
};

export const getLocalStorageActiveChannel = (server: number, username: string) => {
  return parseInt(localStorage.getItem(`chatClient#activeChannel@${username}:${server}`) ?? '0', 10);
};
