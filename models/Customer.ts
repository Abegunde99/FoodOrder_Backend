import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    salt: string;
    phone: string;
    address: string;
    pincode: string;
    cart: any;
    orders: any;
}