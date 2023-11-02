import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IPost, IComment, IFormData } from '../types';
import { BASE_URL } from '../utils/constants';

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
    reducerPath: 'postsApi',
    tagTypes: ['Posts'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getPosts: builder.query<IPost[], null>({
            query: () => '/posts',
            // providesTags: (result) =>
            //     result
            //         ? [
            //               ...result.map(({ id }) => ({
            //                   type: 'Posts' as const,
            //                   id,
            //               })),
            //               { type: 'Posts', id: 'LIST' },
            //           ]
            //         : [{ type: 'Posts', id: 'LIST' }],
        }),
        getCommentsById: builder.query<IComment[], number>({
            query: (id) => `/posts/${id}/comments`,
        }),
        editPost: builder.mutation<IPost, IPost>({
            query: ({ id, ...patch }) => ({
                url: `posts/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            // invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
        }),
        createPost: builder.mutation<IPost, IFormData>({
            query: (body) => ({
                url: `posts`,
                method: 'POST',
                body,
            }),
            // invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
        }),
        removePost: builder.mutation<null, number>({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE',
            }),
            // invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetPostsQuery,
    useGetCommentsByIdQuery,
    useEditPostMutation,
    useRemovePostMutation,
    useCreatePostMutation,
} = postsApi;
