import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
// import commentsReducer from './commentsSlice.tsx';
// import usersReducer from './usersSlice.tsx';
import { postsApi } from '../api/postsApi';
import { userApi } from '../api/userApi';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        // comments: commentsReducer,
        // users: usersReducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postsApi.middleware, userApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
