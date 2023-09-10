import { IsEmail, Length, IsEmpty } from 'class-validator';


export class CreateCustomerDetails {
    @Length(7, 12)
    phone: string;

    @IsEmail()
    email: string;

    @Length(6, 12)
    password: string;
}