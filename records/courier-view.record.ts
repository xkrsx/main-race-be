import {FieldPacket} from "mysql2";
import {pool} from "../utils/db";
import {Category, CourierViewEntity} from "../types";
import {ValidationError} from "../utils/errors";

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
    finishedA: number;
    cp_b_name: string;
    cp_b_code: number;
    finishedB: number;
    cp_c_name: string;
    cp_c_code: number;
    finishedC: number;
    jobPoints: number;
    jobPenalties: number;
    finishedJob: number;


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
        this.finishedA = obj.finishedA;
        this.cp_b_name = obj.cp_b_name;
        this.cp_b_code = obj.cp_b_code;
        this.finishedB = obj.finishedB;
        this.cp_c_name = obj.cp_c_name;
        this.cp_c_code = obj.cp_c_code;
        this.finishedC = obj.finishedC;
        this.jobPoints = obj.jobPoints;
        this.jobPenalties = obj.jobPenalties;
        this.finishedJob = obj.finishedJob;
    };

    static async getAllJobsOfOne(courierNumber: number): Promise<any> {
        const [results] = await pool.execute(
            "SELECT couriers.courierId, couriers.courierNumber, couriers.courierName, couriers.category, couriers.courierPoints, couriers.courierPenalties, jobs.jobId, jobs.jobNumber, jobs.cp_a_name, jobs.cp_a_code, jobs.cp_b_name, jobs.cp_b_code, jobs.cp_c_name, jobs.cp_c_code, jobs.jobPoints, couriers_jobs.id, couriers_jobs.finishedA, couriers_jobs.finishedB, couriers_jobs.finishedC, .couriers_jobs.jobPenalties, couriers_jobs.finishedJob FROM couriers JOIN couriers_jobs ON couriers.courierNumber = couriers_jobs.courierNumber JOIN jobs ON couriers_jobs.jobNumber = jobs.jobNumber WHERE couriers.courierNumber = :courierNumber ORDER BY couriers_jobs.jobNumber ASC", {
                courierNumber
            }) as CourierViewResults;
        return results.map(obj => new CourierViewRecord(obj));
    };

    static async getSingleJobOfOne(id: string): Promise<any> {
        const [results] = await pool.execute("SELECT couriers.courierId, couriers.courierNumber, couriers.courierName, couriers.category, couriers.courierPoints, couriers.courierPenalties, jobs.jobId, jobs.jobNumber, jobs.cp_a_name, jobs.cp_a_code, jobs.cp_b_name, jobs.cp_b_code, jobs.cp_c_name, jobs.cp_c_code, jobs.jobPoints, couriers_jobs.id, couriers_jobs.finishedA, couriers_jobs.finishedB, couriers_jobs.finishedC, .couriers_jobs.jobPenalties, couriers_jobs.finishedJob FROM couriers JOIN couriers_jobs ON couriers.courierNumber = couriers_jobs.courierNumber JOIN jobs ON couriers_jobs.jobNumber = jobs.jobNumber WHERE couriers_jobs.id = :id", {
            id
        }) as CourierViewResults;
        return results.length === 0 ? null : new CourierViewRecord(results[0]);
    };

    async updateA(): Promise<string> {
        if (!this.id) {
            throw new Error("Cannot update this job - it does not exist!")
        } else {
            await pool.execute("UPDATE `couriers_jobs` SET `finishedA` = 1 WHERE `id` = :id", {
                id: this.id,
            });
            return this.id;
        }
    };

    async updateB(): Promise<string> {
        if (!this.id) {
            throw new Error("Cannot update this job - it does not exist!")
        } else {
            await pool.execute("UPDATE `couriers_jobs` SET `finishedB` = 1, `jobPenalties` = 0, `finishedJob` = 1 WHERE `id` = :id", {
                id: this.id,
            });
            return this.id;
        }
    };

}