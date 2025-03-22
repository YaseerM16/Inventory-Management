import mongoose, { Schema, Document } from "mongoose";

export interface ISale extends Document {
    saleId: string;
    productName: string;
    customerName?: string; // Optional for cash sales
    quantity: number;
    price: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

const SalesSchema: Schema = new Schema({
    saleId: { type: String, required: true, unique: true }, // Unique identifier for tracking
    productName: { type: String, required: true },
    customerName: { type: String, required: false }, // Optional for cash sales
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<ISale>("Sale", SalesSchema);
