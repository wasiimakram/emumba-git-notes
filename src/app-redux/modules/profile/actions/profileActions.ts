import { createAsyncThunk } from '@reduxjs/toolkit';

import ax from '../../../../common/api-client/apiClient';
import type { ApiResponse, GetGistArgs } from '../../../../common/typings/app';
import { success_code } from '../../../../common/utils/constants';

export const getMyGist = createAsyncThunk<ApiResponse, GetGistArgs>(
  'gist/getMyGist',
  async ({ page, perPage }) => {
    try {
      const res = await ax.get(`/gists?per_page=${perPage}&page=${page}`);
      if (res.status === success_code && res.data) return res.data;
      throw new Error(res.data.error || res.statusText);
    } catch (error) {
      throw error;
    }
  },
);
