import { isEmail, length, isEmpty } from 'class-validator';


export class CreateCustomerDetails {
    @isEmpty()
    @length(7, 12)
    phone: string;

    @isEmail()
    email: string;

    @isEmpty()
    @length(6, 12)
    password: string;
}