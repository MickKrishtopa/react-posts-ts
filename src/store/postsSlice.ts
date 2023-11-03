import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

import { IPost } from '../types';

const initialState: {
    posts: Array<IPost>;
    sortedPosts: Array<IPost>;
    favorite: Array<number>;
    confirmId: number | null;
} = {
    posts: [],
    sortedPosts: [],
    favorite: [],
    confirmId: null,
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
        setConfirmId(state, action: PayloadAction<number>) {
            state.confirmId = action.payload;
        },

        removePost(state, action: PayloadAction<number>) {
            state.posts = state.posts.filter(
                (post) => post.id !== action.payload,
            );
        },
        addPost(state, action: PayloadAction<IPost>) {
            state.posts.unshift(action.payload);
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
        setSortPost(
            state,
            action: PayloadAction<{ category: string; direction: boolean }>,
        ) {
            const { category, direction } = action.payload;
            state.sortedPosts = state.posts
                .map((i) => i)
                .sort((a, b) => {
                    if (category === 'title') {
                        // console.log('title');
                        return a.title < b.title ? -1 : 1;
                    }
                    if (category === 'userid') {
                        // console.log('userId');
                        return a.userId < b.userId ? -1 : 1;
                    }
                    // console.log('no if');
                    return 0;
                });

            if (category === 'favorite') {
                state.sortedPosts = state.posts.filter((post) =>
                    state.favorite.includes(post.id),
                );
            }

            if (!direction) {
                state.sortedPosts = state.sortedPosts.reverse();
            }
        },
    },
});

export const {
    setPosts,
    setConfirmId,
    removePost,
    addPost,
    editPost,
    toggleToFavorite,
    setFavorite,
    setSortPost,
} = postsSlice.actions;
export default postsSlice.reducer;
