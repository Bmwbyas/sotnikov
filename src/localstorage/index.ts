import {LocalData} from "../store/slice/appSlice/types.ts";


export const saveInLocalStorage = (data: LocalData) => {

    for (const key in data) {
        localStorage.setItem(key, JSON.stringify(data[key]))
    }
}
export const getLocalStorage = (): LocalData | null => {

    const posts = localStorage.getItem('posts')
    const users = localStorage.getItem('users')

    if (!users || !posts) {
        return null
    }
    const albums = localStorage.getItem('album')
    const app = localStorage.getItem('app')
    const comments = localStorage.getItem('comments')
    const photos = localStorage.getItem('photos')
    const todos = localStorage.getItem('todos')

    let albumsParse
    if (albums) albumsParse = JSON.parse(albums)

    let appParse
    if (app) appParse = JSON.parse(app)

    let commentsParse
    if (comments) commentsParse = JSON.parse(comments)

    let photosParse
    if (photos) photosParse = JSON.parse(photos)

    let postsParse
    if (posts) {
        postsParse = JSON.parse(posts)
        if(postsParse.length===0){return null}
    }

    let usersParse
    if (users) usersParse = JSON.parse(users)

    let todosParse
    if (todos) todosParse = JSON.parse(todos)

    return {
        albums: albumsParse,
        app: appParse,
        comments: commentsParse,
        photos: photosParse,
        posts: postsParse,
        users: usersParse,
        todos:todosParse
    }
}

