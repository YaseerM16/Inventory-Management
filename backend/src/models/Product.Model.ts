import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    quantity: number;
    price: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 1 },
        isDeleted: { type: Boolean, required: true, default: false }
    },
    { timestamps: true }
);

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
