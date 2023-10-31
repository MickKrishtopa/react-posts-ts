import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

import { IPost } from '../types';

const initialState: { posts: Array<IPost>; favorite: Array<number> } = {
    posts: [],
    favorite: [],
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<Array<IPost>>) {
            state.posts = action.payload;
        },
        setFavorite(state, action: PayloadAction<Array<number>>) {
            state.favorite = action.payload;
        },
        removePost(state, action: PayloadAction<number>) {
            state.posts = state.posts.filter(
                (post) => post.id !== action.payload,
            );
        },
        editPost(state, action: PayloadAction<IPost>) {
            state.posts = state.posts.map((post) =>
                post.id === action.payload.id ? action.payload : post,
            );
        },
        toggleToFavorite(state, action: PayloadAction<number>) {
            const index = state.favorite.indexOf(action.payload);

            if (index !== -1) {
                state.favorite.splice(index, 1);
            } else {
                state.favorite.push(action.payload);
            }
            localStorage.setItem('favorite', JSON.stringify(state.favorite));
        },
    },
});

export const { setPosts, removePost, editPost, toggleToFavorite, setFavorite } =
    postsSlice.actions;
export default postsSlice.reducer;
