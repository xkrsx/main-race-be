import {JobEntity} from "../job";

export enum Category {
    Open = 'open',
    WTNB = 'wtnb',
}

export interface NewCourierEntity extends Omit<CourierEntity, 'courierId' | 'password'> {
    courierId?: string;
    password?: number
}

export interface SimpleCourierEntity {
    courierNumber: number;
    courierName: string;
    category: Category;
}

export interface CourierEntity extends SimpleCourierEntity {
    courierId: string;
    password: number;
    courierPoints: number;
    courierPenalties: number;
}

export interface CourierViewEntity extends Omit<CourierEntity, 'password'>, JobEntity {
    id: string;
    finishedA: number;
    finishedB: number;
    finishedC: number;
    jobPenalties: number;
    finishedJob: number;
}