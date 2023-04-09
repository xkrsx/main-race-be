import {AdminNewJobRecord} from "../../records/admin-new-job.record"

const defaultObject = {
    cp_a_name: 'CP A',
    cp_a_code: 1111,
    cp_b_name: 'CP B',
    cp_b_code: 2222,
    cp_c_name: 'CP C',
    cp_c_code: 3333,
    points: 100,
}

test('Can build AdminNewJobRecord', () => {
    const job = new AdminNewJobRecord(defaultObject);
    expect(job.cp_a_name).toBe('CP A');
    expect(job.cp_a_code).toBe(1111);
    expect(job.cp_b_name).toBe('CP B');
    expect(job.cp_b_code).toBe(2222);
    expect(job.cp_c_name).toBe('CP C');
    expect(job.cp_c_code).toBe(3333);
    expect(job.points).toBe(100);
});

test('CP C and CP C code may be empty.', () => {
    expect(() => new AdminNewJobRecord({
        ...defaultObject,
        cp_c_name: null,
        cp_c_code: null,
    })).not.toThrow();
});