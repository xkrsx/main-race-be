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