
const isPurchaseOrderSupplierInformationFormValid = (
    supplierID: number | undefined, 
    isApproved: boolean | null | undefined
): boolean => {

   
    return (
        supplierID !== undefined &&
        (isApproved !== undefined && (isApproved || isApproved === null))
    )
   
}

export default isPurchaseOrderSupplierInformationFormValid