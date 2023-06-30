import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {jsonPlaceholderApi} from "../../../api/api.ts";
import {handleServerNetworkError} from "../../../utils/error-utils.ts";
import {ITodo, UpdateTodosType} from "./types.ts";
import {LocalData} from "../appSlice/types.ts";
import {initializeApp} from "../appSlice";

const initialState: ITodo[] = []

export const getTodos = createAsyncThunk('todos/getPosts', async (_, {dispatch}) => {
    try {
        const res = await jsonPlaceholderApi.getAllTodos()

        return res.data
    } catch (err) {
        const error: any = err
        handleServerNetworkError(dispatch, error)
    }
})
export const removeTodos = createAsyncThunk('todos/removeTodos', async (data: number[], {dispatch}) => {
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
export const updateTodos = createAsyncThunk('todos/updateTodos', async (data: UpdateTodosType, {dispatch}) => {
    try {
        const res = await jsonPlaceholderApi.updateTodos(data)
        return {data: res.data}
    } catch (err) {
        const error: any = err
        handleServerNetworkError(dispatch, error)
    }
})

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(removeTodos.fulfilled, (state, action: PayloadAction<{ data: number[] } | undefined>) => {
            if (action.payload) {
                for (const id of action.payload.data) {
                    const index = state.findIndex(post => post.id === id)
                    state.splice(index, 1)
                }
            }
        }),
            builder.addCase(updateTodos.fulfilled, (state, action: PayloadAction<{
                data: ITodo
            } | undefined>) => {
                if (!action.payload) return
                const index = state.findIndex(todo => todo.id === action.payload!.data.id)
                state[index] = {...state[index], ...action.payload.data}

            }),
            builder.addCase(getTodos.fulfilled, (_, action: PayloadAction<ITodo[] | undefined>) => {
                if (action.payload)
                    return action.payload?.map(p => ({...p, favorites: false}))

            }),
            builder.addCase(initializeApp.fulfilled, (_, action: PayloadAction<LocalData | undefined>) => {
                if(action.payload?.todos){return action.payload.todos}
            })
    }
})

export const todosReducer = todosSlice.reducer