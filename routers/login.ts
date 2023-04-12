import {Request, Response, Router} from "express";
import {LoginRecord} from "../records/login.record";

export const loginRouter = Router();

loginRouter
    .get('/:courierNumber/:password', async (req: Request, res: Response) => {
        const loginView = await LoginRecord.getCourierCredentials(Number(req.params.courierNumber), Number(req.params.password));

        res.json({
            loginView,
        });
    })