import { IsEmail, Length, IsEmpty } from 'class-validator';


export class CreateCustomerDetails {
    @Length(7, 15)
    phone: string;

    @IsEmail()
    email: string;

    @Length(6, 12)
    password: string;
}

export class UserLoginInputs {
    @IsEmail()
    email: string;

    @Length(6, 12)
    password: string;
}

export class EditCustomerProfileInput {
    @Length(3,13)
    firstName: string;

    @Length(3,13)
    lastName: string;

    @Length(7, 15)
    address: string;

}

export interface OrderInputs{
    _id: string;
    unit: number;
}