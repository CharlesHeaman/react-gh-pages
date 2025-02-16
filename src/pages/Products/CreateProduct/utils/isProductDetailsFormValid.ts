import { CreateProductAttributes } from './../../../../types/products.types';

const isProductDetailsFormValid = (productDetails: CreateProductAttributes, productCategoryID: number | undefined): boolean => {
    return (
        productDetails.description.length > 0 &&
        productDetails.size_or_model.length > 0 &&
        productDetails.unit.length > 0 &&
        productCategoryID !== undefined
    )
   
}

export default isProductDetailsFormValid