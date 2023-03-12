import {Router} from "express";
import {CourierViewRecord} from "../records/courier-view.record";

export const loginRouter = Router();

loginRouter
    .get('/', async (req, res) => {
        //@TODO pobierać id po logowaniu
        const courierViewList = await CourierViewRecord.getOne("abc");

        res.json({
            courierViewList,
        });
    })