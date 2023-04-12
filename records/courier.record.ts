import {Category, CourierEntity, NewCourierEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";
import {codeGenerator} from "../utils/code-generator";

type CourierRecordResults = [CourierEntity[], FieldPacket[]];

export class CourierRecord implements CourierEntity {
    public courierId: string;
    public courierNumber: number;
    public courierName: string;
    public password: number;
    public category: Category;
    public courierPoints: number;
    public courierPenalties: number;
    public sum: number;

    constructor(obj: CourierEntity) {

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
        this.password = obj.password;
        this.category = obj.category;
        this.courierPoints = obj.courierPoints;
        this.courierPenalties = obj.courierPenalties;
        this.sum = obj.sum;
    }

    static async getSingleCourier(id: string): Promise<CourierRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `couriers` WHERE id = :id", {
            id,
        }) as CourierRecordResults;
        return results.length === 0 ? null : new CourierRecord(results[0]);
    }

    async insert(): Promise<string> {
        if (!this.courierId) {
            this.courierId = uuid();
        } else {
            throw new Error('Nie można stworzyć tego zawodnika, ponieważ już istnieje.');
        }

        if (!this.password || this.password < 1000 || this.password > 9999) {
            this.password = codeGenerator(1000, 9999);
        } else {
            throw new Error('Nie można użyć tego hasła, ponieważ jest błędne.');
        }

        await pool.execute("INSERT INTO `couriers` (`courierId`, `courierNumber`, `courierName`, `password`, `category`) VALUES (:id, :number, :name, :password, :category)", this);

        return this.courierId;
    }

    static async getResults(): Promise<CourierRecord[]> {
        const [results] = await pool.execute("SELECT `courierId`, `courierNumber`, `courierName`, `category`, `courierPoints`, `courierPenalties`, `sum` FROM `couriers` ORDER BY `sum` DESC") as CourierRecordResults;

        return results.map(obj => new CourierRecord(obj));
    }


}