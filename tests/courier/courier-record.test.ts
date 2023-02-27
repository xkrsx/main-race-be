import {CourierRecord} from "../../records/courier.record";

const defaultObject = {
    number: 267,
    name: 'Tester',
    password: 1111,
    category: 'open',
};

test('Can build CourierRecord', () => {
    const courier = new CourierRecord(defaultObject);
    expect(courier.number).toBe(267);
    expect(courier.name).toBe('Tester');
    expect(courier.password).toBe(1111);
    expect(courier.category).toBe('open');
});

test('Number must be in a range between 0 and 999.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        number: 1000,
    })).toThrow('Numer musi pochodzić z zakresu od 0 do 999.')
});

test('Number must be in a range between 0 and 999.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        number: -1,
    })).toThrow('Numer musi pochodzić z zakresu od 0 do 999.')
});

test('Name may not be empty or has more than 15 characters.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        name: '',
    })).toThrow('Imię/ksywa nie może być pusta, ani przekraczać 15 znaków.')
});

test('Name may not be empty or has more than 15 characters.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        name: '1234567890123456',
    })).toThrow('Imię/ksywa nie może być pusta, ani przekraczać 15 znaków.')
});

test('Password must be in a range between 1000 and 9999.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        password: null,
    }))
});

test('Password must be in a range between 1000 and 9999.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        password: 10000,
    }))
});

test('Category may not be empty.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        category: ''
    }))
});