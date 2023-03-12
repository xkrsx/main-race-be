import {Category, CourierViewEntity} from "../types";
import {FieldPacket} from "mysql2";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";

export type CourierViewResults = [CourierViewEntity[], FieldPacket[]];

export class CourierViewRecord implements CourierViewEntity {
    courierId: string;
    courierNumber: number;
    courierName: string;
    category: Category;
    courierPoints: number;
    courierPenalties: number;
    jobId: string;
    jobNumber: number;
    cp_a_name: string;
    cp_a_code: number;
    cp_b_name: string;
    cp_b_code: number;
    cp_c_name: string;
    cp_c_code: number;
    jobPoints: number;

    constructor(obj: CourierViewEntity) {

        if (!obj.courierNumber || obj.courierNumber < 0 || obj.courierNumber > 999) {
            throw new ValidationError('Numer musi pochodzić z zakresu od 0 do 999.');
        }

        if (!obj.courierName || obj.courierName.length > 15) {
            throw new ValidationError('Imię/ksywa nie może być pusta, ani przekraczać 15 znaków.');
        }

        if (!obj.category) {
            throw new ValidationError('Zawodnik musi być przypisany do kategorii.');
        }
        this.courierId = obj.courierId;
        this.courierNumber = obj.courierNumber;
        this.courierName = obj.courierName;
        this.category = obj.category;
        this.courierPoints = obj.courierPoints;
        this.courierPenalties = obj.courierPenalties;
        this.jobId = obj.jobId;
        this.jobNumber = obj.jobNumber;
        this.cp_a_name = obj.cp_a_name;
        this.cp_a_code = obj.cp_a_code;
        this.cp_b_name = obj.cp_b_name;
        this.cp_b_code = obj.cp_b_code;
        this.cp_c_name = obj.cp_c_name;
        this.cp_c_code = obj.cp_c_code;
        this.jobPoints = obj.jobPoints;
    }



    static async getOne(id: string): Promise<any> {
        const [results] = await pool.execute(
            "SELECT couriers.courierId, couriers.courierNumber, couriers.courierName, couriers.category, couriers.courierPoints, couriers.courierPenalties, jobs.jobId, jobs.jobNumber, jobs.cp_a_name, jobs.cp_a_code, jobs.cp_b_name, jobs.cp_b_code, jobs.cp_c_name, jobs.cp_c_code, jobs.jobPoints FROM couriers JOIN couriers_jobs ON couriers.courierId = couriers_jobs.courierId JOIN jobs ON couriers_jobs.jobId = jobs.jobId WHERE couriers.courierId = :id", {
                id
            }) as CourierViewResults;
        return results.map(obj => new CourierViewRecord(obj));
    }

}