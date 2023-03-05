import express, {json} from "express";
import cors from "cors";
import 'express-async-errors';
import {handleError} from "./utils/errors";
import {CourierViewRecord} from "./records/courier-view.record";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());

app.get('/', (req, res) => {
    throw new Error('oopsie');
})

const test = async () => {
    const results = await CourierViewRecord.getOne('abc');
    console.log(results);
};
test();

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});