import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import modalsReducer from './modalsSlice';
import filterReducer from './filterSlice';

import { postsApi } from '../api/postsApi';
import { userApi } from '../api/userApi';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        modals: modalsReducer,
        sorts: filterReducer,

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
