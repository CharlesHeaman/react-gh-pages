import { CreateProductAttributes } from './../../../../types/products.types';

const isProductOrderInformationFormValid = (productDetails: CreateProductAttributes, supplierID: number | undefined, maintenanceID: number | undefined): boolean => {
    return (
        productDetails.catalogue_number.length > 0 &&
        productDetails.part_number.length > 0 &&
        supplierID !== undefined &&
        maintenanceID !== undefined
    )
   
}

export default isProductOrderInformationFormValid