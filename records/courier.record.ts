import {CourierEntity, NewCourierEntity} from "../types";
import {ValidationError} from "../utils/errors";

export class CourierRecord implements CourierEntity {
    public id: string;
    public number: number;
    public name: string;
    public tasks: string[];
    public password: string;
    public points: number;
    public penalties: number;
    public category: string;

    constructor(obj: NewCourierEntity) {
        if (!obj.number) {
            throw new ValidationError('Pole numer nie może być puste.');
        }

        if (!obj.name || obj.name.length > 30) {
            throw new ValidationError('Imię/ksywa nie może być pusta, ani przekraczać 30 znaków.');
        }

        if (obj.tasks !== null) {
            throw new ValidationError('Zawodnik nie może posiadać żadnych zadań na starcie.');
        }

        if (!obj.password || obj.password.length > 4) {
            throw new ValidationError('Hasło nie może być puste, ani przekraczać 4 znaków.');
        }

        if (obj.points !== 0) {
            throw new ValidationError('Zawodnik musi posiadać 0 punktów na starcie.');
        }

        if (obj.penalties !== 0) {
            throw new ValidationError('Zawodnik nie może posiadać żadnych punktów karnych na starcie.');
        }

        if (!obj.category) {
            throw new ValidationError('Zawodnik musi być przypisany do kategorii.');
        }

        this.id = obj.id;
        this.number = obj.number;
        this.name = obj.name;
        this.tasks = obj.tasks;
        this.password = obj.password;
        this.points = obj.points;
        this.penalties = obj.penalties;
        this.category = obj.category;
    }

}