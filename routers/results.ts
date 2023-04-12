import {Router} from "express";
import {CourierRecord} from "../records/courier.record";

export const resultsRouter = Router();

resultsRouter
    .get('/', async (req, res) => {
        const raceResults = await CourierRecord.getResults();

        res.json({
            raceResults,
        });
    })