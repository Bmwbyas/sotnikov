import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {jsonPlaceholderApi} from "../../../api/api.ts";
import {handleServerNetworkError} from "../../../utils/error-utils.ts";
import {IPhoto} from "./types.ts";
import {initializeApp} from "../appSlice";
import {LocalData} from "../appSlice/types.ts";


export const getPhotos = createAsyncThunk('photos/getPhotos', async (id: number, {dispatch}) => {
    try {
        const res = await jsonPlaceholderApi.getPhotos(id)
        console.log(res.data)
        return {data: res.data, id}
    } catch (err) {
        const error: any = err
        handleServerNetworkError(dispatch, error)
    }
})

const initialState: IPhoto[] = []

export const photoSlice = createSlice({

    name: 'photos',
    initialState,

    reducers: {},
    extraReducers: (builder) => {
            builder.addCase(getPhotos.fulfilled, (_, action: PayloadAction<{
                data: IPhoto[],
                id: number
            } | undefined>) => {
                if (action.payload)
                   return  action.payload.data
            }),
            builder.addCase(initializeApp.fulfilled, (_, action: PayloadAction<LocalData|undefined >) => {
                if (action.payload?.photos)
                    return action.payload?.photos

            })
    },

})


export const photoReducer = photoSlice.reducer