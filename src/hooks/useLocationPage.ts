import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useLocationPage = () => {
  const queryClient = useQueryClient();

  const { data: page = 0 } = useQuery({
    queryKey: ['locationPage'],
    queryFn: async () => queryClient.getQueryData<number>(['locationPage']) || 0,
    initialData: 0,
    staleTime: Infinity,
  });

  const setPage = useCallback(
    (newPage: number) => {
      queryClient.setQueryData(['locationPage'], newPage);
    },
    [queryClient]
  );

  return { page, setPage };
};

