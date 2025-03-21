import { IProductServiceMethods } from "../../interface/service.Interface/product.service.interface"
import { IProduct } from "../../models/Product.Model"
import ProductRepository from "../../repositories/userRepository/product.repository"
import { productInput } from "../../types/user.types"


export default class ProductServices implements IProductServiceMethods {
    private productRepository: ProductRepository

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }
    async addProduct(data: productInput): Promise<IProduct> {
        try {
            const addProduct = await this.productRepository.addProduct(data)
            return addProduct
        } catch (error: unknown) {
            throw error
        }
    }
    async editProduct(productId: string, data: productInput): Promise<IProduct> {
        try {
            const addProduct = await this.productRepository.editProduct(productId, data)
            return addProduct as IProduct
        } catch (error: unknown) {
            throw error
        }
    }

    async deleteProduct(productId: string): Promise<IProduct> {
        try {
            const updatedProduct = await this.productRepository.deleteProduct(productId)
            return updatedProduct as IProduct
        } catch (error: unknown) {
            throw error
        }
    }

    async getProducts(query: any): Promise<{ products: IProduct[], totalProducts: number }> {
        try {
            const products = await this.productRepository.getProducts(query)
            return products
        } catch (error) {
            throw error
        }
    }
}

const productRespositoy = new ProductRepository()
export const productServices = new ProductServices(productRespositoy)