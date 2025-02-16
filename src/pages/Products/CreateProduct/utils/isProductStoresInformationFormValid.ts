import { CreateProductAttributes } from './../../../../types/products.types';

const isProductStoresInformationFormValid = (productDetails: CreateProductAttributes, supplierID: number | undefined): boolean => {
    return (
        productDetails.manufacturer.length > 0 &&
        productDetails.catalogue_number.length > 0 &&
        productDetails.part_number.length > 0 &&
        supplierID !== undefined
    )
   
}

export default isProductStoresInformationFormValid