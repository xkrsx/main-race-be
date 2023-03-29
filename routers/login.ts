import {Request, Response, Router} from "express";
import {CourierViewRecord} from "../records/courier-view.record";
import {NewJobRecord} from "../records/new-job.record";

export const loginRouter = Router();

loginRouter
    .get('/', async (req, res) => {
// @TODO pobierać id po logowaniu
        const courierViewList = await CourierViewRecord.getAllJobsOfOne(111);

        res.json({
            courierViewList,
        });
    })

    .post('/', async (req: Request, res: Response) => {
        const newJob = new NewJobRecord(req.body);
        await newJob.insert(req.body);

        res.json(newJob);
    })