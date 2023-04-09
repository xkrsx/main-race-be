import {Request, Response, Router} from "express";
import {CourierViewRecord} from "../records/courier-view.record";
import {CourierNewJobRecord} from "../records/courier-new-job.record";
import {ValidationError} from "../utils/errors";

export const raceRouter = Router();

raceRouter
    .patch('/finishedA/:jobId/', async (req: Request, res: Response) => {
        const id = req.params.jobId;
        const finishedA = req.body;
        console.log(req);

        const job = await CourierViewRecord.getSingleJobOfOne(id);
        if (job === null) {
            throw new ValidationError(`Job with id ${id} does not exist!`);
        }

        job.finishedA = finishedA === null ? null : finishedA;
        await job.updateA();
    })
    .patch('/finishedB/:jobId', async (req: Request, res: Response) => {
        const id = req.params.jobId;
        const {finishedB, jobPenalties, finishedJob} = req.body;

        const job = await CourierViewRecord.getSingleJobOfOne(id);
        if (job === null) {
            throw new ValidationError(`Job with id ${id} does not exist!`);
        }

        job.finishedB = finishedB === null ? null : finishedB;
        job.jobPenalties = jobPenalties === null ? null : jobPenalties;
        job.finishedJob = finishedJob === null ? null : finishedJob;
        await job.updateB();
    })
    .get('/:courierNumber/', async (req, res) => {
        const courierViewList = await CourierViewRecord.getAllJobsOfOne(Number(req.params.courierNumber));

        res.json({
            courierViewList,
        });
    })
    .post('/', async (req: Request, res: Response) => {
        const newJob = new CourierNewJobRecord(req.body);
        await newJob.insert(req.body);

        res.json(newJob);
    })