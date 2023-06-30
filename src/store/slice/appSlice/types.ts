import {Album} from "../albumSlice/types.ts";
import {ICommentsState} from "../comentsSlice/types.ts";
import {IPhoto} from "../photosSlice/types.ts";
import {IPost, Post} from "../postSlice/types.ts";
import {IUser} from "../usersSlice/types.ts";
import {ITodo} from "../todosSlice/types.ts";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppType={
    status: RequestStatusType ,
    error: null|string
}
export type LocalData = {
    albums?: Album[]
    app?: AppType
    comments?: ICommentsState
    photos?: IPhoto[]
    posts?: Post[]
    users?: IUser[]
    serverPost?:IPost[]
    todos?:ITodo[]
}