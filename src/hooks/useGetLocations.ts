import { useQuery } from '@tanstack/react-query';
import { getLocations } from '../api';
import { useSearch } from './useSearch';
import { useTablePagination } from './useTablePagination';
import { useCategoryFilter } from './useCategoryFilter';

export const useGetLocations = () => {
  const { search } = useSearch();
  const { page, setPage } = useTablePagination();
  const { category, setCategory } = useCategoryFilter();
  const isSearching = search && (search as string).trim() !== '';

  if (isSearching) {
    if (page !== 1) setPage(1);
    if (category !== '') setCategory('');
  }

  return useQuery({
    queryKey: ['locations', page, category, search],
    queryFn: () =>
      getLocations(
        page,
        category,
        search as string,
      ),
  });
};

