export enum Category {
    Open = 'open',
    WTNB = 'wtnb',
}

export interface NewCourierEntity extends Omit<CourierEntity, 'id' | 'password'> {
    id?: string;
    password?: number
}

export interface SimpleCourierEntity {
    number: number;
    name: string;
    category: Category;
}

export interface CourierEntity extends SimpleCourierEntity {
    id: string;
    password: number;
}