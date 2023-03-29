import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";
import {Category, CourierViewEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {codeGenerator} from "../utils/code-generator";

export type CourierViewResults = [CourierViewEntity[], FieldPacket[]];

export class CourierViewRecord implements CourierViewEntity {
    id: string;
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
    jobPenalties: number;
    finished: boolean;

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

        this.id = obj.id;
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
        this.jobPenalties = obj.jobPenalties;
        this.finished = obj.finished;
    }


    static async getAllJobsOfOne(courierNumber: number): Promise<any> {
        const [results] = await pool.execute(
            "SELECT couriers.courierId, couriers.courierNumber, couriers.courierName, couriers.category, couriers.courierPoints, couriers.courierPenalties, jobs.jobId, jobs.jobNumber, jobs.cp_a_name, jobs.cp_a_code, jobs.cp_b_name, jobs.cp_b_code, jobs.cp_c_name, jobs.cp_c_code, jobs.jobPoints, couriers_jobs.jobPenalties, couriers_jobs.finished FROM couriers JOIN couriers_jobs ON couriers.courierNumber = couriers_jobs.courierNumber JOIN jobs ON couriers_jobs.jobNumber = jobs.jobNumber WHERE couriers.courierNumber = :courierNumber ORDER BY couriers_jobs.jobNumber ASC", {
                courierNumber
            }) as CourierViewResults;
        return results.map(obj => new CourierViewRecord(obj));
    }

}