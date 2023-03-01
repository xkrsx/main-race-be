import {CheckpointEntity, NewCheckpointEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {FieldPacket} from "mysql2";
import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";

type CheckpointRecordResults = [CheckpointEntity[], FieldPacket[]];


export class CheckpointRecord implements CheckpointEntity {
    public id: string;
    public name: string;
    public address: string;
    public lat: number;
    public lon: number;

    constructor(obj: NewCheckpointEntity) {
        if (!obj.name || obj.name.length > 20) {
            throw new ValidationError('Nazwa Checkpointu nie może być pusta, ani przekraczać 20 znaków.');
        }
        if (!obj.address || obj.address.length > 50) {
            throw new ValidationError('Adres Checkpointu nie może być pusty, ani przekraczać 50 znaków.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.address = obj.address;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    static async getOne(id: string): Promise<CheckpointRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `checkpoints` WHERE id = :id", {
            id
        }) as CheckpointRecordResults;
        return results.length === 0 ? null : new CheckpointRecord(results[0]);
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new ValidationError('Nie można stworzyć tego Checkpointu, ponieważ już istnieje.');
        }

        await pool.execute("INSERT INTO `checkpoints` (`id`, `name``, `address`, `lat`, `lon`) VALUES (:id, :name, :address, :lat, :lon)", this);

        return this.id;
    }

    static async findAll(): Promise<CheckpointRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `checkpoints`") as CheckpointRecordResults;

        return results.map(obj => new CheckpointRecord(obj));
    }
}