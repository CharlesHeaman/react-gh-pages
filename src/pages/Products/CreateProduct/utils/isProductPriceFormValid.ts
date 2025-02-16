import { CreateProductAttributes } from './../../../../types/products.types';

const isProductPriceFormValid = (productDetails: CreateProductAttributes): boolean => {
    return (
        productDetails.price.length > 0 &&    
        productDetails.percentage_discount.length > 0 
    )
   
}

export default isProductPriceFormValid