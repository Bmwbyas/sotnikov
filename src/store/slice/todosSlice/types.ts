export type removeType={
    id:number
    userId:number
}
export interface ITodo {
    "userId": number
    "id": number
    "title": string
    "completed": boolean
}

export type UpdateTodosType={
    "userName"?: string|undefined
    "id"?: number
    "title"?: string
    "completed"?: boolean
}
