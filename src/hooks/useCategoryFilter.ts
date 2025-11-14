import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useCategoryFilter = () => {
  const queryClient = useQueryClient();

  const { data: category = '' } = useQuery({
    queryKey: ['categoryFilter'],
    queryFn: async () => queryClient.getQueryData<string>(['categoryFilter']) || '',
    initialData: '',
    staleTime: Infinity,
  });

  const setCategory = (newCategory: string) => {
    queryClient.setQueryData(['categoryFilter'], newCategory);
  };

  return { category, setCategory };
};

