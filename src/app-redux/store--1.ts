import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import gistReducer from './modules/gist/gistSlice';
import profileReducer from './modules/profile/profileSlice';

export const store = configureStore({
  reducer: {
    gist: gistReducer,
    profile: profileReducer,
  },
  middleware: [thunkMiddleware],
});
// export type AppStore = ReturnType<typeof setupStore>
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
  requestStatus: 'pending' | 'fulfilled' | 'rejected';
  arg?: T;
  aborted?: boolean;
  condition?: boolean;
  rejectedWithValue?: boolean;
};
