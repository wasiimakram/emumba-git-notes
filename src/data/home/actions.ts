import ax from '../../common/api-client/apiClient';
import { success_code } from '../../common/utils/constants';

export async function getHomeGist(page: number, perPage: number) {
    const { data } = await ax.get(`/gists/public?per_page=${perPage}&page=${page}`);
    return data;
}
export async function getGistDetails(id: string) {
    try {
        const res = await ax.get(`/gists/${id}`);
        if (res.status === success_code && res.data) return res.data;
        else throw new Error(res.data.error || res.statusText);
    } catch (error) {
        throw error;
    }
}