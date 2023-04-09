import express, {json} from "express";
import cors from "cors";
import 'express-async-errors';
import {handleError} from "./utils/errors";
import rateLimit from 'express-rate-limit';
import {raceRouter} from "./routers/race";
import {loginRouter} from "./routers/login";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))

app.use('/login', loginRouter);
app.use('/race', raceRouter);
// app.use('/results', resultsRouter);
// app.use('/admin', adminRouter);
// app.use('/english', englishRouter);

// const test = async (req: any, res: any) => {
//     const newJob = new CourierViewRecord(req.body);
//     await newJob.insert(267);
//     console.log(res.json(newJob));
// };
// test();

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});