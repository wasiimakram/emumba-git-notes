import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store--1";
import { createGistContent, deleteGist, forkGist, getGistDetails, getGistPublic, starGist } from "./actions/gistActions";
import { ApiResponse, GistState } from "../../../common/typings/app";
import { useAppDispatch } from "../../hooks";
import { message } from "antd";
import { getMyGist } from "../profile/actions/profileActions";

const initialState: GistState = {
  publicGist: [],
  gistDetails: [],
  loader: false,
  page: 1,
  perPage: 12,
  total: 3000,
  pageLayout: 'grid',
  isStarred: false,
  isForked: false,
  starCount: 0,
  forkCount: 0,
  isStarredArr: [],
  isForkedArr: [],
  isDeleted: false,
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
    changePageLayout: (state, action) => {
      state.pageLayout = action.payload;
    },
    handleNavSearch: (state, action) => {
      const query = action.payload;
      if (query !== "") {
        state.publicGist = state.publicGist.filter((item: any) =>
          item.id.toLowerCase().includes(query.toLowerCase())
        );
      }
    },
    deleteGistValue: (state, action) => {
      const id = action.payload;
      state.publicGist = state.publicGist.filter((item: Record<string, any>) => item.id !== id);
      state.isDeleted = true;
    }
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

    // Get Gist Details
    builder.addCase(getGistDetails.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getGistDetails.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(getGistDetails.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
      state.loader = false;
      state.gistDetails = action.payload
    });

    // Give a Star to Gist
    builder.addCase(starGist.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(starGist.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(starGist.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
      const { payload } = action;
      state.loader = false;
      state.isStarred = !state.isStarred;
      state.starCount = state.isStarred ? 1 : 0;
      state.isStarredArr = [...state.isStarredArr, payload.staredId]
      message.success(`Gist ${state.isStarred ? 'Stared' : 'Unstared'} successfully`)
    });
    // Fork Gist
    builder.addCase(forkGist.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(forkGist.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(forkGist.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
      state.loader = false;
      state.isForked = !state.isForked;
      state.forkCount = state.isForked ? 1 : 0;
      state.isForkedArr = [...state.isStarredArr, action.payload.staredId]
      message.success(`Gist ${state.isForked ? 'Forked' : 'Unsubscribed'} successfully`)
    });
    // Add Gist
    builder.addCase(createGistContent.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(createGistContent.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(createGistContent.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
      state.loader = false;
      // message.success(`Gist created successfully`)
    });
    // Delete Gist
    builder.addCase(deleteGist.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(deleteGist.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(deleteGist.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
      state.loader = false;
      message.success(`Gist deleted successfully`);
    });

  }
});

export const {
  handlePageChange,
  handleManualNext,
  resetListingValues,
  changePageLayout,
  handleNavSearch,
  deleteGistValue,
} = gistSlice.actions;
export const selectPublicGist = (state: RootState) => state.gist.publicGist;
export const selectIsLoading = (state: RootState) => state.gist.loader;
export const selectPage = (state: RootState) => state.gist.page;
export const selectPerPage = (state: RootState) => state.gist.perPage;
export const selectTotal = (state: RootState) => state.gist.total;
export const selectPageLayout = (state: RootState) => state.gist.pageLayout;
export const selectGistDetails = (state: RootState) => state.gist.gistDetails;
export const selectIsStarred = (state: RootState) => state.gist.isStarred;
export const selectIsForked = (state: RootState) => state.gist.isForked;
export const selectIsStarredArr = (state: RootState) => state.gist.isStarredArr;
export const selectIsForkedArr = (state: RootState) => state.gist.isForkedArr;
export const selectForkCount = (state: RootState) => state.gist.forkCount;
export const selectStarCount = (state: RootState) => state.gist.starCount;
export const selectIsDeleted = (state: RootState) => state.gist.isDeleted;

export default gistSlice.reducer;
