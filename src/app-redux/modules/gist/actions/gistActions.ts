import { createAsyncThunk } from "@reduxjs/toolkit";
import ax from "../../../../common/api-client/apiClient";
import { success_code } from "../../../../common/utils/constants";
import { ApiResponse } from "../../../../common/typings/app";

interface GetGistPublicArgs {
    page: number;
    perPage: number;
}
interface GistApiResponse {
    // Define the structure of your API response data here
    // For example: total_records, items, etc.
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