import {pool} from "../../utils/db";
import {JobRecord} from "../../records/job.record";

const defaultObject = {
    cp_a_name: '[TEST] CP A',
    cp_b_name: 'CP B',
    cp_c_name: 'CP C',
    points: 100,
};

afterAll(async () => {
    await pool.execute('DELETE FROM `jobs` WHERE `cp_a_name` LIKE "%[TEST]%"');
    await pool.end();
})

test('JobRecord returns data from database for a single entry.', async () => {
    const job = await JobRecord.getOne('abc')

    expect(job).toBeDefined();
    expect(job.id).toEqual('abc');
    expect(job.number).toEqual(2)
    expect(job.cp_a_name).toEqual('CP A');
    expect(job.cp_a_code).toEqual(1111);
    expect(job.cp_b_name).toEqual('CP B');
    expect(job.cp_b_code).toEqual(2222);
    expect(job.cp_c_name).toEqual('CP C');
    expect(job.cp_c_code).toEqual(3333);
    expect(job.points).toEqual(100);
});

test('JobRecord.getOne returns null from database for non-existing entry.', async () => {
    const job = await JobRecord.getOne('abcdef');

    expect(job).toBeNull();
});

test('JobRecord.findAll returns array of found entries.', async () => {
    const jobs = await JobRecord.findAll();

    expect(jobs).not.toEqual([]);
    expect(jobs[0].id).toBeDefined();
});

test('JobRecord.insert returns new UUID and correct codes for CP A, CP B and CP C.', async () => {
    const job = new JobRecord(defaultObject);

    await job.insert();

    expect(job.id).toBeDefined();
    expect(typeof job.id).toEqual('string');
    expect(job.cp_a_code).toBeDefined();
    expect(typeof job.cp_a_code).toEqual('number');
    expect(job.cp_a_code).toBeGreaterThanOrEqual(1000);
    expect(job.cp_a_code).toBeLessThanOrEqual(9999);
    expect(job.cp_b_code).toBeDefined();
    expect(typeof job.cp_b_code).toEqual('number');
    expect(job.cp_b_code).toBeGreaterThanOrEqual(1000);
    expect(job.cp_b_code).toBeLessThanOrEqual(9999);
    expect(job.cp_c_code).toBeDefined();
    expect(typeof job.cp_c_code).toEqual('number');
    expect(job.cp_c_code).toBeGreaterThanOrEqual(1000);
    expect(job.cp_c_code).toBeLessThanOrEqual(9999);
});

test('JobRecord.insert inserts data to database.', async () => {
    const job = new JobRecord(defaultObject);

    await job.insert();

    const foundJob = await JobRecord.getOne(job.id);

    expect(foundJob).toBeDefined();
    expect(foundJob).not.toBeNull();
    expect(foundJob.id).toBe(job.id);
});

test('Job DB inserts correct AI on number column.', async () => {
    const job = new JobRecord(defaultObject);

    await job.insert();

    const foundJob = await JobRecord.getOne(job.id);

    expect(foundJob.number).toBeDefined();
    expect(typeof foundJob.number).toEqual('number');
})