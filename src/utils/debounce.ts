export const debounce = (callback: (params: any[]) => any, interval: any) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(args), interval);
  };
};
