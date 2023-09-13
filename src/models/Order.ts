import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
    orderId: string;
    items: [any];
    totalAmount: number;
    orderDate: Date;
    paidThrough: string;
    paymentResponse: string;
    orderStatus: string;
}

const OrderSchema = new Schema({
    orderId: { type: String, required: true },
    items: {
        type: [{
            food: { type: Schema.Types.ObjectId, ref: 'Food', required:true },
            unit: {type: Number, required: true}
        }]
    },
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date },
    paidThrough: { type: String },
    paymentResponse: { type: String },
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

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export { Order}