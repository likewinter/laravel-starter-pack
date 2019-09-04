export interface User {
    id: number
    name: string
    email: string
}

export interface ProfileState {
    user?: User
    loaded: boolean
}
