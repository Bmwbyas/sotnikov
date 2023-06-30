export interface IPost {
    "userId": number
    "id": number
    "title": string
    "body": string
}
export type Post = IPost & { favorites: boolean }

export type UpdatePostType={
    "userName"?: string|undefined
    "id"?: number
    "title"?: string
    "body"?: string

}
