export interface NewCourierEntity extends Omit<CourierEntity, 'id' | 'password'> {
    id?: string;
    password?: number
}

export interface SimpleCourierEntity {
    number: number;
    name: string;
    category: string;
}

export interface CourierEntity extends SimpleCourierEntity {
    id: string;
    password: number;
}