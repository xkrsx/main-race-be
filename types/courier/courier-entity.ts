export interface NewCourierEntity extends Omit<CourierEntity, 'id'> {
    id?: string;
}

export interface CourierEntity {
    id: string;
    number: number;
    name: string;
    tasks: string[];
    password: string;
    points: number;
    penalties: number;
    category: string;
}