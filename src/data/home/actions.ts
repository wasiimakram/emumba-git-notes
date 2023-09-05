import axios from 'axios';
import ax from '../../common/api-client/apiClient';
import { GetGistArgs } from '../../common/typings/app';
import { QueryKey } from 'react-query';

export const getHomeGist = async ({ queryKey }: { queryKey: QueryKey }) => {
    const [_, { page, perPage }] = queryKey as any[];
    const response = await ax.get(`/gists/public?per_page=${perPage}&page=${page}`);
    return response.data;
};

// export const getGistPublic = createAsyncThunk<ApiResponse, GetGistArgs>(
//     "gist/getGistPublic",
//     async ({ page, perPage }) => {
//         try {
//             const res = await ax.get(
//                 `/gists/public?per_page=${perPage}&page=${page}`
//             );
//             if (res.status === success_code && res.data) return res.data;
//             else throw new Error(res.data.error || res.statusText);
//         } catch (error) {
//             throw error;
//         }
//     }
// );