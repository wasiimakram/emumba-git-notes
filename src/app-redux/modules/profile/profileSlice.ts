import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type {
  ApiResponse,
  ProfileGistState,
} from '../../../common/typings/app';
import type { RootState } from '../../store--1';
import { getMyGist } from './actions/profileActions';

const initialState: ProfileGistState = {
  myGists: [],
  loader: false,
  page: 1,
  perPage: 12,
  total: 3000,
  isStarred: false,
  isForked: false,
  starCount: 0,
  forkCount: 0,
};
export const gistSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    handlePageChange: (state, action) => {
      const { payload } = action;
      state.page = payload;
    },
    handleManualNext: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyGist.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getMyGist.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(
      getMyGist.fulfilled,
      (state, action: PayloadAction<ApiResponse>) => {
        state.loader = false;
        state.myGists = action.payload;
      },
    );
  },
});

export const { handlePageChange, handleManualNext } = gistSlice.actions;
export const selectMyGist = (state: RootState) => state.profile.myGists;
export const selectIsLoading = (state: RootState) => state.profile.loader;
export const selectPage = (state: RootState) => state.profile.page;
export const selectPerPage = (state: RootState) => state.profile.perPage;
export const selectTotal = (state: RootState) => state.profile.total;

export default gistSlice.reducer;
