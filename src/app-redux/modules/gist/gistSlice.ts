import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getGistPublic } from "./actions/gistActions";
import { ApiResponse } from "../../../common/typings/app";

type GistState = {
  publicGist: any;
  loader: boolean;
};
const initialState: GistState = {
  publicGist: [],
  loader: false,
};
export const gistSlice = createSlice({
  name: "gist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGistPublic.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getGistPublic.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(getGistPublic.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
      state.loader = false;
      console.log("payload", action.payload)
      state.publicGist = action.payload
    });
  }
});

export const {
  // getAllUsers,
} = gistSlice.actions;
export const selectPublicGist = (state: RootState) => state.gist.publicGist;
export const selectIsLoading = (state: RootState) => state.gist.loader;

export default gistSlice.reducer;
