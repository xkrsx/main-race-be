import {pool} from "../../utils/db";
import {CourierRecord} from "../../records/courier.record";

const defaultObject = {
    number: 111,
    name: '[TEST] Tester',
    category: 'open',
};

afterAll(async () => {
    await pool.execute('DELETE FROM `couriers` WHERE `name` LIKE "%[TEST]%"');
    await pool.end();
})

test('CourierRecord returns data from database for a single entry.', async () => {
    const courier = await CourierRecord.getOne('abc')

    expect(courier).toBeDefined();
    expect(courier.id).toEqual('abc');
    expect(courier.number).toEqual(111)
    expect(courier.name).toEqual('tester');
    expect(courier.password).toEqual('1234');
    expect(courier.category).toEqual('open');
})

test('CourierRecord.getOne returns null from database for unexisting entry.', async () => {
    const courier = await CourierRecord.getOne('abcdef');

    expect(courier).toBeNull();
})

//@TODO zrobić join dwóch tabel
// test('CourierRecord.findAll returns array of found entries.', async () => {
//     const couriers = await CourierRecord.findAll();
//
//     expect(couriers).toEqual([]);
//     expect(couriers[0].id).toBeDefined();
// })

test('CourierRecord.insert returns new UUID.', async () => {
    const courier = new CourierRecord(defaultObject);

    await courier.insert();

    expect(courier.id).toBeDefined();
    expect(typeof courier.id).toBe('string');
})

test('CourierRecord.insert returns new password in a range between 1000 and 9999.', async () => {
    const courier = new CourierRecord(defaultObject);

    await courier.insert();

    expect(courier.password).toBeDefined();
    expect(typeof courier.password).toBe('number');
    expect(courier.password).toBeGreaterThanOrEqual(1000);
    expect(courier.password).toBeLessThanOrEqual(9999);
})

test('CourierRecord.insert inserts data to database.', async () => {
    const courier = new CourierRecord(defaultObject);

    await courier.insert();

    const foundCourier = await CourierRecord.getOne(courier.id);

    expect(foundCourier).toBeDefined();
    expect(foundCourier).not.toBeNull();
    expect(foundCourier.id).toBe(courier.id);
})