import {CheckpointRecord} from "../../records/checkpoint.record";

const defaultObject = {
    name: 'Test Checkpoint',
    address: 'Marynarska, 70-612 Szczecin',
    lat: 53.4016770,
    lon: 14.5608860,
};

test('Can build CheckpointRecord', () => {
    const checkpoint = new CheckpointRecord(defaultObject);

    expect(checkpoint.name).toBe('Test Checkpoint');
    expect(checkpoint.address).toBe('Marynarska, 70-612 Szczecin');
    expect(checkpoint.lat).toBe(53.4016770);
    expect(checkpoint.lon).toBe(14.5608860);
});

//@TODO poprawić ten test
test('Name may not be empty.', () => {
    const checkpoint = new CheckpointRecord({
        ...defaultObject,
        name: undefined,
    });

    expect(checkpoint.name).toThrow('Nazwa Checkpointu nie może być pusta, ani przekraczać 20 znaków.');
});

//@TODO poprawić ten test
test('Name may not be longer than 20 characters', () => {
    const checkpoint = new CheckpointRecord({
        ...defaultObject,
        name: '12345678901234567890',
    });


    expect(checkpoint.name).toThrow('Nazwa Checkpointu nie może być pusta, ani przekraczać 20 znaków.');
});