export const convertPageToApi = (page: number): number => {
  return page + 1;
};

export const calculateMaxPage = (totalCount: number, pageSize: number = 10): number => {
  return Math.max(0, Math.ceil(totalCount / pageSize) - 1);
};

