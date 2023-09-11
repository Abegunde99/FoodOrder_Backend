import mongoose, { Schema, Document, Model } from 'mongoose';

interface IVendor extends Document { 
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean | string;
    coverImages: [string];
    rating: number;
    foods: any;
}

const VendorSchema = new Schema({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String], required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    salt: { type: String },
    serviceAvailable: { type: String, required: true },
    coverImages: { type: [String], required: true },
    rating: { type: Number, default: 0,required: true },
    foods: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Food' }]
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});

const Vendor = mongoose.model<IVendor>('Vendor', VendorSchema);

export { Vendor };