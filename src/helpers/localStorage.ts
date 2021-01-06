export const getLocalStorageActiveServer = (userId: number) => {
  return parseInt(localStorage.getItem(`chatClient#activeServer@${userId}`) ?? '0', 10);
};

export const getLocalStorageActiveChannel = (server: number, userId: number | null) => {
  return parseInt(localStorage.getItem(`chatClient#activeChannel@${userId}:${server}`) ?? '0', 10);
};
