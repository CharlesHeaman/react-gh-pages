import { ProductCategoryResponseData } from "../types/productCategory.types"

const findProductCategory = (productCategories: Array<ProductCategoryResponseData>, productCategoryID: number) => {
    return productCategories.find(productCategory => productCategory.id === productCategoryID)
}

export default findProductCategory