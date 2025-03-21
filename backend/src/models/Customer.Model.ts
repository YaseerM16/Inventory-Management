import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
    name: string;
    address: string;
    phone: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>(
    {
        name: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        phone: { type: Number, required: true },
        isDeleted: { type: Boolean, required: true, default: false }
    },
    { timestamps: true }
);

const CustomerModel = mongoose.model<ICustomer>("Customer", CustomerSchema);

export default CustomerModel;
