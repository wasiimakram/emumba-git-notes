import { createAsyncThunk } from "@reduxjs/toolkit";
import ax from "../../../../common/api-client/apiClient";
import { fork_success_code, star_success_code, success_code } from "../../../../common/utils/constants";
import { ApiResponse } from "../../../../common/typings/app";

interface GetGistArgs {
    page: number;
    perPage: number;
}

export const getMyGist = createAsyncThunk<ApiResponse, GetGistArgs>(
    "gist/getMyGist",
    async ({ page, perPage }) => {
        try {
            const res = await ax.get(
                `/gists?per_page=${perPage}&page=${page}`
            );
            if (res.status === success_code && res.data) return res.data;
            else throw new Error(res.data.error || res.statusText);
        } catch (error) {
            throw error;
        }
    }
);