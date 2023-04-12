import express, {json, Router} from "express";
import cors from "cors";
import 'express-async-errors';
import {handleError} from "./utils/errors";
import rateLimit from 'express-rate-limit';

import {raceRouter} from "./routers/race";
import {loginRouter} from "./routers/login";
import {resultsRouter} from "./routers/results";
import {adminRouter} from "./routers/admin";
import {config} from "./config/config";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000/',
}));

app.use(json());
// app.use(rateLimit({
//     windowMs: 1000 * 60 * 5, // 5 minutes
//     max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
// }))

const router = Router();

router.use('/login', loginRouter);
router.use('/race', raceRouter);
router.use('/results', resultsRouter);
router.use('/admin', adminRouter);

app.use('/api', router);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});