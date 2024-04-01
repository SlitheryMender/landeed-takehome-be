
export interface CreateEntryData {
    name: string,
    gender: string,
    age: number,
    profession: string,
    services?: string|null
}

export interface DBEntryData extends CreateEntryData {
    id: string,
    createdAt: string,
    updatedAt: string
}

