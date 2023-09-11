import { getGistDetails, getHomeGist } from './actions';
import { useQuery, QueryClient } from '@tanstack/react-query';

export function useHome(page: number, perPage: number) {
    return useQuery(['gists'], () => getHomeGist(page, perPage), {
        keepPreviousData: true,
        // initialData: previousData,
    });
}
export function useGistDetails(id: string) {
    return useQuery(['gists-details'], () => getGistDetails(id), {
        keepPreviousData: true,
        refetchOnMount: true,
    });
}