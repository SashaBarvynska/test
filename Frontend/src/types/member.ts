export interface Member {
    id: number
    first_name: string
    last_name: string
    age: number
}

export interface CreateMember extends Omit<Member, 'id' | 'age'> {
    age: string
}