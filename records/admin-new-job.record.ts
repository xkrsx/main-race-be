import {JobEntity, NewJobEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";
import {codeGenerator} from "../utils/code-generator";

type JobRecordResults = [JobEntity[], FieldPacket[]];

export class AdminNewJobRecord implements JobEntity {
    jobId: string;
    jobNumber: number;
    cp_a_name: string;
    cp_a_code: number;
    cp_b_name: string;
    cp_b_code: number;
    cp_c_name: string | null;
    cp_c_code: number | null;
    jobPoints: number;

    constructor(obj: NewJobEntity) {
        if (!obj.cp_a_name || obj.cp_a_name.length > 36) {
            throw new ValidationError('Nazwa Checkpointu A nie może być dłuższa niż 36 znaków.');
        }

        if (!obj.cp_b_name || obj.cp_b_name.length > 36) {
            throw new ValidationError('Nazwa Checkpointu B nie może być dłuższa niż 36 znaków.');

        }
        if (obj.cp_c_name !== null) {
            if (obj.cp_c_name.length > 36) {
                throw new ValidationError('Nazwa Checkpointu C nie może być dłuższa niż 36 znaków.');
            }
        }

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


    static async getOne(id: string): Promise<AdminNewJobRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `jobs` WHERE id = :id", {
            id
        }) as JobRecordResults;
        return results.length === 0 ? null : new AdminNewJobRecord(results[0]);
    }

    async insert(): Promise<string> {
        if (!this.jobId) {
            this.jobId = uuid();
        } else {
            throw new Error('Nie można stworzyć tego zadania, ponieważ jest błędny.')
        }

        if (!this.cp_a_code || this.cp_a_code < 1000 || this.cp_a_code > 9999) {
            this.cp_a_code = codeGenerator(1000, 9999);
        } else {
            throw new Error('Nie można użyć tego kodu, ponieważ jest błędny.');
        }

        if (!this.cp_b_code || this.cp_b_code < 1000 || this.cp_b_code > 9999) {
            this.cp_b_code = codeGenerator(1000, 9999);
        } else {
            throw new Error('Nie można użyć tego kodu, ponieważ jest błędny.');
        }

        if (this.cp_c_name !== null) {
            if (!this.cp_c_code || this.cp_c_code < 1000 || this.cp_c_code > 9999) {
                this.cp_c_code = codeGenerator(1000, 9999);
            } else {
                throw new Error('Nie można użyć tego kodu, ponieważ już istnieje.');
            }
        }

        await pool.execute("INSERT INTO `jobs` (`jobId`, `cp_a_name`, `cp_a_code`, `cp_b_name`, `cp_b_code`, `cp_c_name`, `cp_c_code`, `jobPoints`) VALUES (:jobId, :cp_a_name, :cp_a_code, :cp_b_name, :cp_b_code, :cp_c_name, :cp_c_code, :jobPoints)", this);

        return this.jobId;
    }

    static async findAll(): Promise<AdminNewJobRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `jobs`") as JobRecordResults;

        return results.map(obj => new AdminNewJobRecord(obj));
    }
}