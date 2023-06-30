import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {initializeApp} from "../appSlice";
import {jsonPlaceholderApi} from "../../../api/api.ts";
import {handleServerNetworkError} from "../../../utils/error-utils.ts";
import {IComment, ICommentsState} from "./types.ts";
import {LocalData} from "../appSlice/types.ts";
import {saveInLocalStorage} from "../../../localstorage";


export const getComments = createAsyncThunk('comments/getComments', async (id: number, {dispatch}) => {
    try {
        const res = await jsonPlaceholderApi.getComments(id)
        console.log(res.data)
        return {data: res.data, id}
    } catch (err) {
        const error: any = err
        handleServerNetworkError(dispatch, error)
    }
})

const initialState: ICommentsState = {}

export const commentsSlice = createSlice({

    name: 'comments',
    initialState,

    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initializeApp.fulfilled, (state, action: PayloadAction<LocalData | undefined>) => {
            if(action.payload?.comments){return action.payload.comments}
            if(action.payload?.serverPost){
            const stateCopy = {...state}

            return action.payload.serverPost.reduce((_, tl) => {
                stateCopy[tl.id] = []
                return stateCopy
            }, stateCopy)
            }
        }),
            builder.addCase(getComments.fulfilled, (state, action: PayloadAction<{
                data: IComment[],
                id: number
            } | undefined>) => {
                if (action.payload)
                    state[action.payload.id] = action.payload.data
            })
    }
})


export const commentsReducer = commentsSlice.reducer