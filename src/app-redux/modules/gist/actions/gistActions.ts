import { createAsyncThunk } from "@reduxjs/toolkit";
import ax from "../../../../common/api-client/apiClient";
import { fork_success_code, star_success_code, success_code } from "../../../../common/utils/constants";
import { ApiResponse } from "../../../../common/typings/app";

interface GetGistPublicArgs {
    page: number;
    perPage: number;
}

export const getGistPublic = createAsyncThunk<ApiResponse, GetGistPublicArgs>(
    "gist/getGistPublic",
    async ({ page, perPage }) => {
        try {
            const res = await ax.get(
                `/gists/public?per_page=${perPage}&page=${page}`
            );
            if (res.status === success_code && res.data) return res.data;
            else throw new Error(res.data.error || res.statusText);
        } catch (error) {
            throw error;
        }
    }
);
export const getGistDetails = createAsyncThunk<ApiResponse, { id: string }>(
    "gist/getGistDetails",
    async ({ id }) => {
        try {
            const res = await ax.get(
                `/gists/${id}`
            );
            if (res.status === success_code && res.data) return res.data;
            else throw new Error(res.data.error || res.statusText);
        } catch (error) {
            throw error;
        }
    }
);
export const starGist = createAsyncThunk<ApiResponse, { id: string }>(
    "gist/starGist",
    async ({ id }) => {
        try {
            const res = await ax.put(`/gists/${id}/star`);
            if (res.status === star_success_code) return res.data
            else throw new Error(res.data.error || res.statusText);
        } catch (error) {
            throw error;
        }
    }
);
export const forkGist = createAsyncThunk<ApiResponse, { id: string }>(
    "gist/forkGist",
    async ({ id }) => {
        try {
            const res = await ax.post(`/gists/${id}/forks`);
            if (res.status === fork_success_code) return res.data
            else throw new Error(res.data.error || res.statusText);
        } catch (error) {
            throw error;
        }
    }
);
export const updateGistContent = createAsyncThunk<ApiResponse, { id: string, updatedContent: any }>(
    "gist/updateGistContent",
    async ({ id, updatedContent }) => {
        const headers = {
            'Accept': 'application/vnd.github+json',
        };
        try {
            const res = await ax.put(`/gists/${id}`, updatedContent, { headers });
            if (res.status === success_code && res.data.Status === 204) return res.data;
            else throw new Error(res.data.error || res.statusText);
        } catch (error) {
            throw error;
        }
    }
);
export const createGistContent = createAsyncThunk<ApiResponse, { description: string, files: any }>(
    "gist/createGistContent",
    async ({ description, files }) => {
        try {
            const res = await ax.post(`/gists`, { description, files });
            if (res.status === fork_success_code && res.data) return res.data;
            else throw new Error(res.data.error || res.statusText);
        } catch (error) {
            throw error;
        }
    }
);