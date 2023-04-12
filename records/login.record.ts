import {LoginCourierEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

export type LoginCourierResults = [LoginCourierEntity[], FieldPacket[]];

export class LoginRecord implements LoginCourierEntity {
    courierNumber: number;
    password: number;

    constructor(obj: LoginCourierEntity) {
        if (!obj.courierNumber || obj.courierNumber < 0 || obj.courierNumber > 999) {
            throw new ValidationError('Numer musi pochodzić z zakresu od 0 do 999.');
        }
        if (!obj.password || obj.password < 1000 || obj.password > 9999) {
            throw new ValidationError('Hasło musi pochodzić z zakresu od 0 do 9999.');
        }

        this.courierNumber = obj.courierNumber;
        this.password = obj.password;
    };

    static async getCourierCredentials(courierNumber: number, password: number): Promise<any> {
        const [results] = await pool.execute(
            "SELECT courierNumber, password FROM couriers WHERE courierNumber = :courierNumber AND password = :password", {
                courierNumber,
                password,
            }) as LoginCourierResults;
        return results.length !== 0;
    }
}