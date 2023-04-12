import {CourierRecord} from "../../records/courier.record";
import {Category, NewCourierEntity} from "../../types";

const defaultObject: NewCourierEntity = {
    category: Category.Open,
    courierNumber: 267,
    courierName: 'Tester',
    password: 1111,
    courierPoints: 0,
    courierPenalties: 0
};

test('Can build CourierRecord', () => {
    const courier = new CourierRecord(defaultObject);
    expect(courier.courierNumber).toBe(267);
    expect(courier.courierName).toBe('Tester');
    expect(courier.password).toBe(1111);
    expect(courier.category).toBe('open');
});

test('Number must be in a range between 0 and 999.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        courierNumber: 1000,
    })).toThrow('Numer musi pochodzić z zakresu od 0 do 999.')
});

test('Number must be in a range between 0 and 999.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        courierNumber: -1,
    })).toThrow('Numer musi pochodzić z zakresu od 0 do 999.')
});

test('Name may not be empty or has more than 15 characters.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        courierName: '',
    })).toThrow('Imię/ksywa nie może być pusta, ani przekraczać 15 znaków.')
});

test('Name may not be empty or has more than 15 characters.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        courierName: '1234567890123456',
    })).toThrow('Imię/ksywa nie może być pusta, ani przekraczać 15 znaków.')
});

//@TODO poprawić ten test
test('Password must be in a range between 1000 and 9999.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        password: 0,
    })).toThrowError('Nie można użyć tego hasła, ponieważ jest błędne.')
});

//@TODO: sprawdzić ten test
test('Password must be in a range between 1000 and 9999.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        password: 10000,
    })).toThrowError('Nie można użyć tego hasła, ponieważ jest błędne.')
});

test('Category may not be empty.', () => {
    expect(() => new CourierRecord({
        ...defaultObject,
        category: undefined,
    })).toThrow('Zawodnik musi być przypisany do kategorii.')
});