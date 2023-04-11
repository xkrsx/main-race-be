import {v4 as uuid} from "uuid";
import {codeGenerator} from "../utils/code-generator";
import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";

interface NewJobBtnEntity {
    id?: string;
    courierNumber: number;
    jobNumber: number;
    jobPenalties: 20;
    finishedJob: boolean;
}

export class CourierNewJobRecord implements NewJobBtnEntity {
    id?: string;
    courierNumber: number;
    jobNumber: number;
    jobPenalties: 20;
    finishedJob: boolean;

    constructor(obj: NewJobBtnEntity) {
        if (!obj.courierNumber || obj.courierNumber < 0 || obj.courierNumber > 999) {
            throw new ValidationError('Numer musi pochodzić z zakresu od 0 do 999.');
        }

        this.id = obj.id;
        this.courierNumber = obj.courierNumber;
        this.jobNumber = obj.jobNumber;
        this.jobPenalties = obj.jobPenalties;
        this.finishedJob = obj.finishedJob;
    }

    async insert(courierNumber: number): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error("Cannot insert this job - it already exists.")
        }

        //@TODO dodać mysql który czyta ilość rekordów w tabeli jobs i podaje jako wartość max w generatorze
        if (!this.jobNumber) {
            this.jobNumber = codeGenerator(1, 10);
        }

        await pool.execute("INSERT INTO `couriers_jobs` (`id`, `courierNumber`, `jobNumber`) VALUES (:id, :courierNumber, :jobNumber)", {
            id: this.id,
            courierNumber: this.courierNumber,
            jobNumber: this.jobNumber,
        });

        await pool.execute("UPDATE `couriers` SET `courierPenalties` = `courierPenalties` + 20 WHERE `courierNumber` = :courierNumber", {
            // jobPenalties: this.jobPenalties,
            courierNumber: this.courierNumber,
        })

        return this.id;
    }

}