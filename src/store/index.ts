import {configureStore, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import {usersReducer} from "./slice/usersSlice";
import {postsReducer} from "./slice/postSlice";
import {commentsReducer} from "./slice/comentsSlice";
import {appReducer} from "./slice/appSlice";
import {albumReducer} from "./slice/albumSlice";
import {photoReducer} from "./slice/photosSlice";
import {todosReducer} from "./slice/todosSlice";


export const store = configureStore({
    devTools: true,
    reducer: {
        app:appReducer,
        users:usersReducer,
        posts:postsReducer,
        comments:commentsReducer,
        albums:albumReducer,
        photos:photoReducer,
        todos:todosReducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})
// Infer the `RootState` and `AppDispatch` types from the store itself

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppActionsType = any
export type AppThunk = ThunkAction<void, AppRootStateType, unknown, AppActionsType>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>