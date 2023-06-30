import axios from "axios";
import { IUser} from "../store/slice/usersSlice/types.ts";
import {IPost, UpdatePostType} from "../store/slice/postSlice/types.ts";
import {IAlbum, UpdateAlbumsType} from "../store/slice/albumSlice/types.ts";
import {ITodo, UpdateTodosType} from "../store/slice/todosSlice/types.ts";
import {IPhoto} from "../store/slice/photosSlice/types.ts";
import {IComment} from "../store/slice/comentsSlice/types.ts";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    withCredentials: true,

})

export const jsonPlaceholderApi = {
    getAllPosts() {
        return instance.get<IPost[]>('/posts')
    },
    getAllUsers() {
        return instance.get<IUser[]>('/users')
    },
    getAllAlbums() {
        return instance.get<IAlbum[]>('/albums')
    },
    getAllTodos(){
        return instance.get<ITodo[]>('/todos')
    },
    getPhotos(id: number) {
        return instance.get<IPhoto[]>(`/albums/${id}/photos`)
    },
    getComments(id: number) {
        return instance.get<IComment[]>(`/posts/${id}/comments`)
    },
    removePost(id:number){
        return instance.delete(`/posts/${id}`)
    },
    removeAlbum(id:number){
        return instance.delete(`/albums/${id}`)
    },
    updatePost(data:UpdatePostType){
        return instance.put(`/posts/${data.id}`, data)
    },
    updateAlbum(data:UpdateAlbumsType){
        return instance.put(`/posts/${data.id}`, data)
    },
    updateTodos(data:UpdateTodosType){
        return instance.put(`/todos/${data.id}`, data)
    }
}