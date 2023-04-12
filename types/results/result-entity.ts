import {Category} from "../courier";

export interface ResultEntity {
    courierId: string;
    courierNumber: number;
    courierName: string;
    category: Category;
    courierPoints: number;
    courierPenalties: number;
    sum: number;
}