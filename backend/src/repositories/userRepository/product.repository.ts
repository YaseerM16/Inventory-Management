import { IProductMethods } from "../../interface/repository.interface/product.repository"
import ProductModel, { IProduct } from "../../models/Product.Model"
import { productInput } from "../../types/user.types"
import BaseRepository from "../base.repository"

export default class ProductRepository extends BaseRepository<{
    Product: IProduct
}> implements IProductMethods {
    constructor() {
        super({
            Product: ProductModel
        })
    }

    async getProducts(query: any): Promise<{ products: IProduct[], totalProducts: number }> {
        try {
            const { page = 1, limit = 10, search } = query;

            const queryObj: any = {
                isDeleted: false,
                ...(search && {
                    $or: [
                        { name: { $regex: search, $options: "i" } },
                        { description: { $regex: search, $options: "i" } }
                    ]
                })
            };


            if (search) {
                queryObj.name = { $regex: search, $options: "i" };
            }

            const totalProducts = await this.findAll("Product", queryObj).countDocuments();

            const products = await this.findAll("Product", queryObj)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(parseInt(limit, 10));

            return { products, totalProducts };
        } catch (error) {
            throw error;
        }
    }

    async addProduct(data: productInput): Promise<IProduct> {
        try {

            // Check if category already exists
            const productExists = await this.findOne("Product", { name: data.name });
            if (productExists) {
                throw new Error("Product already exists. Try Edit ..!!");
            }

            const newData: productInput = {
                name: data.name,
                description: data.description,
                quantity: data.quantity,
                price: data.price
            }
            const addProduct = await this.createData('Product', newData as unknown as Partial<IProduct>);
            return addProduct
        } catch (error: unknown) {
            throw error
        }
    }
    async editProduct(productId: string, data: productInput): Promise<IProduct> {
        try {
            // Check if product exists
            const existingProduct = await this.findById("Product", productId);
            if (!existingProduct) {
                throw new Error("Product not found.");
            }

            // Ensure no duplicate name when updating
            if (data.name) {
                const nameConflict = await this.findOne("Product", { name: data.name, _id: { $ne: productId } });
                if (nameConflict) {
                    throw new Error("A product with this name already exists.");
                }
            }

            // Update product
            const updatedProduct = await this.updateById("Product", productId, {
                name: data.name,
                description: data.description,
                quantity: data.quantity,
                price: data.price,
            });

            return updatedProduct as IProduct
        } catch (error) {
            throw error;
        }
    }
    async deleteProduct(productId: string): Promise<IProduct> {
        try {
            const existingProduct = await this.findById("Product", productId);
            if (!existingProduct) {
                throw new Error("Product not found");
            }
            const updatedProduct = await this.updateById(
                "Product",
                productId,
                { isDeleted: true }
            );

            if (!updatedProduct) {
                throw new Error("Failed to update product");
            }

            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }
}