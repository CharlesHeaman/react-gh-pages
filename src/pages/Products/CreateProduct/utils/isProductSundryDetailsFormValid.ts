import { CreateSundryProductAttributes } from './../../../../types/products.types';

const isProductSundryDetailsFormValid = (productDetails: CreateSundryProductAttributes): boolean => {
    return (
        productDetails.description.length > 0 && 
        productDetails.size_or_model.length > 0 && 
        productDetails.unit.length > 0 && 
        productDetails.parent_price_percentage.length > 0
    )
   
}

export default isProductSundryDetailsFormValid