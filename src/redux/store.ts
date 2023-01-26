import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

// to handle app update notifications
import noticeReducer from "./slices/notice";
import TweetReducer from "./slices/tweet.slice";
import profileReducer from "./slices/profile.slice";

export const store = configureStore({
  reducer: {
    notice: noticeReducer,
    tweet: TweetReducer,
    profile: profileReducer,
  },
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
