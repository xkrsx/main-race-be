import {AdminEntity} from "../types";
import {ValidationError} from "../utils/errors";

export class AdminRecord implements AdminEntity {
    login: string;
    password: string;

    constructor(obj: AdminEntity) {
        if (!obj.login || obj.login.length < 4 || obj.login.length > 8) {
            throw new ValidationError("Login must be between 4 and 8 characters.");
        }
        if (!obj.password || obj.password.length < 4 || obj.password.length > 8) {
            throw new ValidationError("Password must be between 4 and 8 characters.");
        }

        this.login = obj.login;
        this.password = obj.password;
    };

    static async getAdminCredentials(login: string, password: string): Promise<any> {
    }
}