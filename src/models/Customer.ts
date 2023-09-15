import mongoose, { Schema, Document, Model } from 'mongoose';
import { IOrder } from './Order';

interface ICustomer extends Document {
    email: string
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
    address: string;
    salt: string;
    verified: boolean;
    otp?: number;
    otpExpiry?: number;
    lng: number;
    lat: number;
    cart: [any];
    orders: [IOrder]
}

const CustomerSchema = new Schema({
    email: {type: String, required: true},
    password: { type: String, required: true },
    phone: {type: String, required: true},
    firstName: { type: String },
    lastName: { type: String},
    address: { type: String },
    salt: { type: String, required: true },
    verified: { type: Boolean, default: false},
    otp: { type: Number },
    otpExpiry: { type: Number},
    lng: { type: Number },
    lat: { type: Number },
    cart: [
        {
            food: { type: Schema.Types.ObjectId, ref: 'Food'},
            unit: { type: Number}
        }
    ],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        }
    },
    timestamps: true
})

const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);

export { Customer}