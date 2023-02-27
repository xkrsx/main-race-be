import {CourierEntity, NewCourierEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";
import {passwordGenerator} from "../utils/password-generator";

type CourierRecordResults = [CourierEntity[], FieldPacket[]];

export class CourierRecord implements CourierEntity {
    public id: string;
    public number: number;
    public name: string;
    public password: number;
    public category: string;

    constructor(obj: NewCourierEntity) {
        if (!obj.number || obj.number < 0 || obj.number > 999) {
            throw new ValidationError('Numer musi pochodzić z zakresu od 0 do 999.');
        }

        if (!obj.name || obj.name.length > 15) {
            throw new ValidationError('Imię/ksywa nie może być pusta, ani przekraczać 15 znaków.');
        }

        if (!obj.category) {
            throw new ValidationError('Zawodnik musi być przypisany do kategorii.');
        }

        this.id = obj.id;
        this.number = obj.number;
        this.name = obj.name;
        this.password = obj.password;
        this.category = obj.category;
    }

    static async getOne(id: string): Promise<CourierRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `couriers` WHERE id = :id", {
            id
        }) as CourierRecordResults;
        return results.length === 0 ? null : new CourierRecord(results[0]);
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Nie można stworzyć tego zawodnika, ponieważ już istnieje.');
        }

        if (!this.password) {
            this.password = passwordGenerator(1111, 9999);
        } else {
            throw new Error('Nie można użyć tego hasła, ponieważ już istnieje.');
        }

        await pool.execute("INSERT INTO `couriers` (`id`, `number`, `name`, `password`, `category`) VALUES (:id, :number, :name, :password, :category)", this);

        return this.id;
    }

    static async findAll(): Promise<CourierRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `couriers_jobs` ORDER BY `sum`") as CourierRecordResults;

        return results.map(obj => new CourierRecord(obj));
    }

}