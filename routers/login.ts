import {Request, Response, Router} from "express";
import {CourierViewRecord} from "../records/courier-view.record";
import {NewJobRecord} from "../records/new-job.record";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";

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

    //@TODO poprawić, żeby było uniwersalne dla wszystkich kolumn finished
    .patch('/finishedA/:jobId', async (req: Request, res: Response) => {
        const id = req.params.jobId;
        const finishedA = req.body;

        const job = await CourierViewRecord.getSingleJobOfOne(id);
        if (job === null) {
            throw new ValidationError(`Job with id ${id} does not exist!`);
        }

        job.finishedA = finishedA === null ? null : finishedA;
        await job.update();

    })