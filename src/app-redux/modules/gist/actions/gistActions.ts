import { createAsyncThunk } from "@reduxjs/toolkit";
import ax from "../../../../common/api-client/apiClient";
import { fork_success_code, star_success_code, success_code } from "../../../../common/utils/constants";
import { ApiResponse, CreateGist, GetGistArgs, GistUpdate } from "../../../../common/typings/app";
import { message } from "antd";

export const getGistPublic = createAsyncThunk<ApiResponse, GetGistArgs>(
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
            if (res.status === star_success_code) return { ...res.data, staredId: id }
            else throw new Error(res.data.error || res.statusText);
        } catch (error: any) {
            message.error(error?.message);
            throw error;
        }
    }
);
export const forkGist = createAsyncThunk<ApiResponse, { id: string }>(
    "gist/forkGist",
    async ({ id }) => {
        try {
            const res = await ax.post(`/gists/${id}/forks`);
            if (res.status === fork_success_code) return { ...res.data, staredId: id }
            else throw new Error(res.data.error || res.statusText);
        } catch (error) {
            throw error;
        }
    }
);
export const updateGistContent = createAsyncThunk<ApiResponse, GistUpdate>(
    "gist/updateGistContent",
    async ({ id, updatedContent }) => {
        const headers = {
            'Accept': 'application/vnd.github+json',
        };
        try {
            const res = await ax.put(`/gists/${id}`, updatedContent, { headers });
            if (res.status === success_code) return res.data;
            else throw new Error(res.data.error || res.statusText);
        } catch (error: any) {
            // message.success("Gist Updated Successfully!")
            message.error(error?.message);
            throw error;
        }
    }
);
export const createGistContent = createAsyncThunk<ApiResponse, CreateGist>(
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
export const deleteGist = createAsyncThunk<ApiResponse, { id: string }>(
    "gist/deleteGist",
    async ({ id }) => {
        try {
            const res = await ax.delete(`/gists/${id}`);
            if (res.status === star_success_code) return res.data
            else throw new Error(res.data.error || res.statusText);
        } catch (error: any) {
            message.error(error?.message);
            throw error;
        }
    }
);