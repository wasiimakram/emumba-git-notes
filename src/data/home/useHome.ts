
import { useQuery } from 'react-query';
import { getHomeGist } from './actions';

export const useHome = () => {
    const page = 1;
    const perPage = 12;
    const { data, isLoading } = useQuery(['gist', { page, perPage }], getHomeGist);
    return { data, isLoading };
};