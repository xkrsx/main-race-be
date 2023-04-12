import {LoginCourierEntity} from "../../types";
import {LoginRecord} from "../../records/login.record";

const defaultObject: LoginCourierEntity = {
    courierNumber: 111,
    password: 1234,
}

test('Can check credentials from DB', () => {
    const newLogin = new LoginRecord(defaultObject);
    console.log(newLogin);
    expect(newLogin.courierNumber).toBe(111);
    expect(newLogin.password).toBe(1234);
});