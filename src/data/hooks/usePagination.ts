// hooks/usePagination.ts
import { useQueryClient } from 'react-query';

// Define the type for your pagination data
type PaginationData = {
    page: number;
    perPage: number;
    total: number
};

export const usePagination = () => {
    const queryClient = useQueryClient();

    const setPage = (page: number) => {
        queryClient.setQueryData('pagination', { page });
    };

    const setPerPage = (perPage: number) => {
        queryClient.setQueryData('pagination', { perPage });
        // queryClient.setQueryData<PaginationData>('pagination', { perPage });
    };

    const getPagination = (): PaginationData => {
        return queryClient.getQueryData<PaginationData>('pagination')
            || { page: 1, perPage: 12, total: 3000 };
    };

    return { setPage, setPerPage, getPagination };
};
