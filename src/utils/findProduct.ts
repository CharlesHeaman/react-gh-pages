import { ProductResponseData } from "../types/products.types"

const findProduct = (products: Array<ProductResponseData>, productID: number) => {
    return products.find(product => product.id === productID)
}

export default findProduct