import type { Action, PreloadedState, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import gistReducer from './modules/gist/gistSlice';
import profileReducer from './modules/profile/profileSlice';

// export const store = configureStore({
//   reducer: {
//     gist: gistReducer,
//     profile: profileReducer,
//   },
//   middleware: [thunkMiddleware],
// });

const rootReducer = combineReducers({
  gist: gistReducer,
  profile: profileReducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
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
