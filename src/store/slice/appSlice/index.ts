import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {jsonPlaceholderApi} from "../../../api/api.ts";
import {handleServerNetworkError} from "../../../utils/error-utils.ts";
import {AppType, LocalData, RequestStatusType} from "./types.ts";


const initialState: AppType = {
    status: 'idle',
    error: null

}

export const initializeApp = createAsyncThunk('app/initializeApp', async (_, {dispatch}) => {
    try {
        // const data = getLocalStorage()

        // if (!data) {
            const posts = await jsonPlaceholderApi.getAllPosts()
            const users = await jsonPlaceholderApi.getAllUsers()

            return {serverPost: posts.data, users: users.data}
        // }
        // return data
    } catch (err) {
        const error: any = err
        handleServerNetworkError(dispatch, error)
    }
})
export const appSlice = createSlice({

    name: 'app',
    initialState,

    reducers: {
        appSetStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        appSetError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initializeApp.fulfilled, (_, action: PayloadAction<LocalData | undefined>) => {
           if(action.payload?.app){return action.payload.app}
        })
    }
})
export const {appSetStatus, appSetError} = appSlice.actions
export const appReducer = appSlice.reducer