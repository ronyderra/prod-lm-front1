import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useLocationPage = () => {
  const queryClient = useQueryClient();

  const { data: page = 0 } = useQuery({
    queryKey: ['locationPage'],
    queryFn: async () => queryClient.getQueryData<number>(['locationPage']) || 0,
    initialData: 0,
    staleTime: Infinity,
  });

  const setPage = (newPage: number) => {
    queryClient.setQueryData(['locationPage'], newPage);
  };

  return { page, setPage };
};

