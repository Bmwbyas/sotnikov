import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {IUser} from "./types.ts";
import {initializeApp} from "../appSlice";
import { updatePost} from "../postSlice";
import { UpdatePostType} from "../postSlice/types.ts";
import {updateAlbum} from "../albumSlice";
import {updateTodos} from "../todosSlice";
import {LocalData} from "../appSlice/types.ts";

const initialState: IUser[] = []

export const usersSlice = createSlice({
    name: 'users',
    initialState,

    reducers: {
        getUsersSuccess: (_, action:PayloadAction<{data:IUser[]}>) => {
          return action.payload.data
        },

    },
    extraReducers: (builder) => {

        builder.addCase(updatePost.fulfilled,(state, action: PayloadAction<{ data:UpdatePostType } | undefined>)=>{
            const user= state.find(u=>u.id===action.payload!.data.id)
            if(user) {
                user.name=action.payload?.data.userName
            }
        }),
        builder.addCase(updateAlbum.fulfilled,(state, action: PayloadAction<{ data:UpdatePostType } | undefined>)=>{
            const user= state.find(u=>u.id===action.payload!.data.id)
            if(user) {
                user.name=action.payload?.data.userName
            }
        }),
        builder.addCase(updateTodos.fulfilled,(state, action: PayloadAction<{ data:UpdatePostType } | undefined>)=>{
            const user= state.find(u=>u.id===action.payload!.data.id)
            if(user) {
                user.name=action.payload?.data.userName
            }
        }),
            builder.addCase(initializeApp.fulfilled, (_, action: PayloadAction<LocalData | undefined>) => {
                if(action.payload?.users){return action.payload.users}
            })
    }
})

export const { getUsersSuccess } = usersSlice.actions
export const usersReducer=  usersSlice.reducer