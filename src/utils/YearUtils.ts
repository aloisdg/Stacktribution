export const getYearFromUnix = (unixDate: number) =>
  new Date(unixDate * 1000).getFullYear();
