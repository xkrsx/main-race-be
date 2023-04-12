import {Request, Response, Router} from "express";
import {AdminRecord} from "../records/admin.record";

export const adminRouter = Router();

adminRouter
    .get("/:login/:password", async (req: Request, res: Response) => {
        const loginView = await AdminRecord.getAdminCredentials(req.params.login, req.params.password);

        res.json({
            loginView,
        });
    })