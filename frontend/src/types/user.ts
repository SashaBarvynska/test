export interface User {
    id: number
    first_name: string
    last_name: string
    age: number
}

export interface CreateUser extends Omit<User, 'id' | 'age' > {
    age: string
}

export interface UpdateUser extends Omit<User, 'age' > {
    age: string
}