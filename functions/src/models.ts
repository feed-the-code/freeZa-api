export interface User {
    id: string
    username: string
}

export interface Item {
    id: string
    createdAt: number
    updatedAt: number
    name: string
    offerBy: string
    adoptBy: string
    condition: ItemCondition
    status: ItemStatus
    categories: string[]
    amount: number
    amountUnit: string
}

export enum ItemCondition {
    New = 'new',
    Used = 'used',
}

export enum ItemStatus {
    Open = 'open',
    Hold = 'hold',
    Traded = 'traded',
    Closed = 'closed',
    Archive = 'archive',
    Deleted = 'deleted',
}

export interface ItemCategory{
    id: string
    name: string
    parent: string
    active: boolean
}