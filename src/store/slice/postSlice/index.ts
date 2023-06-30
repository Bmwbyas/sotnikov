import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {jsonPlaceholderApi} from "../../../api/api.ts";
import {initializeApp} from "../appSlice";
import {handleServerNetworkError} from "../../../utils/error-utils.ts";
import {Post, UpdatePostType} from "./types.ts";
import {LocalData} from "../appSlice/types.ts";

const initialState: Post[] = []

export const getPosts = createAsyncThunk('posts/getPosts', async (_, {dispatch}) => {
    try {
        const res = await jsonPlaceholderApi.getAllPosts()
        console.log(res.data)
        return res.data
    } catch (err) {
        const error: any = err
        handleServerNetworkError(dispatch, error)
    }
})
export const removePost = createAsyncThunk('posts/removePost', async (data: number[], {dispatch}) => {
    try {
        for (const id of data) {
            await jsonPlaceholderApi.removePost(id)
        }

        return {data}
    } catch (err) {
        const error: any = err
        handleServerNetworkError(dispatch, error)

    }
})
export const updatePost = createAsyncThunk('posts/updatePost', async (data: UpdatePostType, {dispatch}) => {
    try {
        const res = await jsonPlaceholderApi.updatePost(data)
        console.log(res.data)
        return {data: res.data}
    } catch (err) {
        const error: any = err
        handleServerNetworkError(dispatch, error)
    }
})

export const postsSlice = createSlice({

    name: 'posts',
    initialState,

    reducers: {
        changeFavorites: (state, action: PayloadAction<{ id: number }>) => {
            return state.map(post => post.id === action.payload.id ? {...post, favorites: !post.favorites} : post)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initializeApp.fulfilled, (_, action: PayloadAction<LocalData | undefined>) => {
            if(action.payload?.posts){return action.payload.posts }
            if(action.payload?.serverPost){return action.payload!.serverPost.map(p => ({...p, favorites: false}))}

        }),
            builder.addCase(removePost.fulfilled, (state, action: PayloadAction<{ data: number[] } | undefined>) => {
                if (action.payload) {
                    for (const id of action.payload.data) {
                        const index = state.findIndex(post => post.id === id)
                        state.splice(index, 1)
                    }

                }
            }),
            builder.addCase(updatePost.fulfilled, (state, action: PayloadAction<{
                data: UpdatePostType
            } | undefined>) => {
                if (!action.payload) return
                const index = state.findIndex(post => post.id === action.payload!.data.id)
                state[index] = {...state[index], ...action.payload.data}

            })
    }
})

export const {changeFavorites} = postsSlice.actions
export const postsReducer = postsSlice.reducer