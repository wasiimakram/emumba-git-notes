import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import gistReducer from './modules/gist/gistSlice'

export const store = configureStore({
  reducer: {
    gist: gistReducer,
  },
  middleware: [thunkMiddleware],
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type IActionMeta<T = void> = {
  requestId: string;
  requestStatus: "pending" | "fulfilled" | "rejected";
  arg?: T;
  aborted?: boolean;
  condition?: boolean;
  rejectedWithValue?: boolean;
};
