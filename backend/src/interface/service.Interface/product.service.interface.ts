import { IProduct } from "../../models/Product.Model"
import { productInput } from "../../types/user.types"

export interface IProductServiceMethods {
    getProducts(query: any): Promise<{ products: IProduct[], totalProducts: number }>
    addProduct(data: productInput): Promise<IProduct>
    editProduct(productId: string, data: productInput): Promise<IProduct>
    deleteProduct(productId: string): Promise<IProduct>
}