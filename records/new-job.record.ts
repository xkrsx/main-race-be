import {v4 as uuid} from "uuid";
import {codeGenerator} from "../utils/code-generator";
import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";

interface NewJobBtnEntity {
    id?: string;
    courierNumber: number;
    jobNumber: number;
    jobPenalties: 0;
    finished: boolean;
}

export class NewJobRecord implements NewJobBtnEntity {
    id?: string;
    courierNumber: number;
    jobNumber: number;
    jobPenalties: 0;
    finished: boolean;

    constructor(obj: NewJobBtnEntity) {
        if (!obj.courierNumber || obj.courierNumber < 0 || obj.courierNumber > 999) {
            throw new ValidationError('Numer musi pochodzić z zakresu od 0 do 999.');
        }

        this.id = obj.id;
        this.courierNumber = obj.courierNumber;
        this.jobNumber = obj.jobNumber;
        this.jobPenalties = obj.jobPenalties;
        this.finished = obj.finished;
    }

    async insert(courierNumber: number): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error("Cannot insert this job - it already exists.")
        }

        if (!this.jobNumber) {
            this.jobNumber = codeGenerator(1, 10);
        }

        await pool.execute("INSERT INTO `couriers_jobs` (`id`, `courierNumber`, `jobNumber`, `pickup`, `dropoff`, `jobPenalties`, `finished`) VALUES (:id, :courierNumber, :jobNumber, CURRENT_TIMESTAMP, NULL, NULL, NULL)", {
            id: this.id,
            courierNumber: this.courierNumber,
            jobNumber: this.jobNumber,
        });

        return this.id;
    }

}