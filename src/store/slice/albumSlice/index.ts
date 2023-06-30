import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {jsonPlaceholderApi} from "../../../api/api.ts";
import {handleServerNetworkError} from "../../../utils/error-utils.ts";
import {Album, IAlbum, UpdateAlbumsType} from "./types.ts";
import {initializeApp} from "../appSlice";
import {LocalData} from "../appSlice/types.ts";

const initialState: Album[] = []

export const getAlbums = createAsyncThunk('albums/getAlbums', async (_, {dispatch}) => {
    try {
        const res = await jsonPlaceholderApi.getAllAlbums()
        console.log(res.data)
        return res.data
    } catch (err) {
        const error: any = err
        handleServerNetworkError(dispatch, error)
    }
})
export const removeAlbum = createAsyncThunk('albums/removeAlbum', async (data: number[], {dispatch}) => {
    try {
        for (const id of data) {
            await jsonPlaceholderApi.removeAlbum(id)
        }

        return {data}
    } catch (err) {
        const error: any = err
        handleServerNetworkError(dispatch, error)

    }
})

export const updateAlbum = createAsyncThunk('albums/updateAlbum', async (data: UpdateAlbumsType, {dispatch}) => {
    try {
        const res = await jsonPlaceholderApi.updatePost(data)
        console.log(res.data)
        return {data: res.data}
    } catch (err) {
        const error: any = err
        handleServerNetworkError(dispatch, error)
    }
})

const AlbumSlice = createSlice({

    name: 'albums',
    initialState,

    reducers: {
        changeFavorites: (state, action: PayloadAction<{ id: number }>) => {
            return state.map(post => post.id === action.payload.id ? {...post, favorites: !post.favorites} : post)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(removeAlbum.fulfilled, (state, action: PayloadAction<{ data: number[] } | undefined>) => {
            if (action.payload) {
                for (const id of action.payload.data) {
                    const index = state.findIndex(post => post.id === id)
                    state.splice(index, 1)
                }
            }
        }),
        builder.addCase(updateAlbum.fulfilled, (state, action: PayloadAction<{
            data: UpdateAlbumsType
        } | undefined>) => {
            if (!action.payload) return
            const index = state.findIndex(post => post.id === action.payload!.data.id)
            state[index] = {...state[index], ...action.payload.data}

        }),
        builder.addCase(getAlbums.fulfilled, (_, action: PayloadAction<IAlbum[]|undefined >) => {
            if (action.payload)
                return action.payload?.map(p => ({...p, favorites: false}))

        }),
        builder.addCase(initializeApp.fulfilled, (_, action: PayloadAction<LocalData|undefined >) => {
            if (action.payload?.albums)
                return action.payload?.albums

        })
    }
})

export const {changeFavorites} = AlbumSlice.actions
export const albumReducer = AlbumSlice.reducer