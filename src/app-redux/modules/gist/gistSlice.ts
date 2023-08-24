import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getGistPublic } from "./actions/gistActions";
import { ApiResponse } from "../../../common/typings/app";

type GistState = {
  publicGist: any;
  loader: boolean;
  page: number;
  perPage: number;
  total: number;
  pageLayout: 'listing' | 'grid';

};
const initialState: GistState = {
  publicGist: [],
  loader: false,
  page: 1,
  perPage: 12,
  total: 3000,
  pageLayout: 'grid'
};
export const gistSlice = createSlice({
  name: "gist",
  initialState,
  reducers: {
    handlePageChange: (state, action) => {
      const { payload } = action;
      state.page = payload;
    },
    handleManualNext: (state) => {
      state.page += 1;
    },
    resetListingValues: (state) => {
      state.page = initialState.page;
      state.perPage = initialState.perPage;
    },
    changePageLayout(state, action) {
      state.pageLayout = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGistPublic.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getGistPublic.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(getGistPublic.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
      state.loader = false;
      state.publicGist = action.payload
    });
  }
});

export const {
  handlePageChange,
  handleManualNext,
  resetListingValues,
  changePageLayout,
} = gistSlice.actions;
export const selectPublicGist = (state: RootState) => state.gist.publicGist;
export const selectIsLoading = (state: RootState) => state.gist.loader;
export const selectPage = (state: RootState) => state.gist.page;
export const selectPerPage = (state: RootState) => state.gist.perPage;
export const selectTotal = (state: RootState) => state.gist.total;
export const selectPageLayout = (state: RootState) => state.gist.pageLayout;

export default gistSlice.reducer;
