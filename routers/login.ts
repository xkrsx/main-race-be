import {Router} from "express";
import {CourierViewRecord} from "../records/courier-view.record";

export const loginRouter = Router();

    // @TODO pobierać id po logowaniu
loginRouter
    .get('/', async (req, res) => {
        const courierViewList = await CourierViewRecord.getOne(111);

        res.json({
            courierViewList,
        });
    })