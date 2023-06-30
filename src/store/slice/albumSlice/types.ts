export type UpdateAlbumsType={
    "userName"?: string|undefined
    "id": number
    "title"?: string

}
export interface IAlbum{
    "userId": number
    "id": number
    "title": string
}
export type Album = IAlbum & { favorites: boolean }
