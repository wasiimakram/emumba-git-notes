import { message } from "antd";
import ax from "../../common/api-client/apiClient";
import { CreateGist, GetGistArgs, GistData, GistUpdate } from "../../common/typings/app";
import { fork_success_code, star_success_code, success_code } from "../../common/utils/constants";

export const createGist = async ({ description, files }: CreateGist) => {
    try {
        const res = await ax.post(`/gists`, { description, files });
        if (res.status === fork_success_code && res.data) return res.data;
        else throw new Error(res.data.error);
    } catch (error) {
        throw error;
    }
};
export const updateGist = async ({ id, updatedContent }: GistUpdate) => {
    const headers = {
        'Accept': 'application/vnd.github+json',
    };
    try {
        const res = await ax.put(`/gists/${id}`, updatedContent, { headers });
        if (res.status === success_code) return res.data;
        else throw new Error(res.data.error || res.statusText);
    } catch (error: any) {
        message.error(error?.message);
        throw error;
    }
};
export const getMyGist = async ({ page, perPage }: GetGistArgs) => {
    try {
        const res = await ax.get(`/gists?per_page=${perPage}&page=${page}`);
        if (res.status === success_code && res.data) return res.data;
        else throw new Error(res.data.error);
    } catch (error) {
        throw error;
    }
};
export const getStarGists = async ({ page, perPage }: GetGistArgs): Promise<GistData[]> => {
    try {
        const url = page !== 0 && perPage !== 0
            ? `/gists/starred?per_page=${perPage}&page=${page}`
            : '/gists/starred';
        const res = await ax.get(url);
        if (res.status === success_code && res.data) return res.data;
        else throw new Error(res.data.error);
    } catch (error) {
        throw error;
    }
};
export const starGist = async (id: string) => {
    try {
        const res = await ax.put(`/gists/${id}/star`);
        if (res.status === star_success_code) return { ...res.data, staredId: id }
        else throw new Error(res.data.error);
    } catch (error: any) {
        message.error(error?.message);
        throw error;
    }
}
export const unStarGist = async (id: string) => {
    try {
        const res = await ax.delete(`/gists/${id}/star`);
        if (res.status === star_success_code) return { ...res.data, staredId: id }
        else throw new Error(res.data.error);
    } catch (error: any) {
        message.error(error?.message);
        throw error;
    }
}
export const forkGist = async (id: string) => {
    try {
        const res = await ax.post(`/gists/${id}/forks`);
        if (res.status === fork_success_code) return { ...res.data, staredId: id }
        else throw new Error(res.data.error);
    } catch (error) {
        throw error;
    }
}
export const deleteGist = async (id: string | undefined) => {
    try {
        const res = await ax.delete(`/gists/${id}`);
        if (res.status === fork_success_code) return { ...res.data, staredId: id }
        else throw new Error(res.data.error);
    } catch (error) {
        throw error;
    }
}