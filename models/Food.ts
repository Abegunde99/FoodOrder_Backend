import mongoose, { Schema, Document, Model } from 'mongoose';

interface IFood extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    vendorId: string;
    readyTime: number;
    foodType: string;
    images: [string];
    rating: number;
}

const FoodSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    vendorId: { type: String, required: true },
    readyTime: { type: Number, required: true },
    foodType: { type: String, required: true },
    images: { type: [String], required: true },
    rating: { type: Number, default: 0, required: true}
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});

const Food = mongoose.model<IFood>('Food', FoodSchema);

export { Food}