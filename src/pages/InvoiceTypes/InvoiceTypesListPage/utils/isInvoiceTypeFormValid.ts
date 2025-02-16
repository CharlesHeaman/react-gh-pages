import { CreateInvoiceTypeAttributes } from "../../../../types/invoiceTypes.types";

const isInvoiceTypeFormValid = (invoiceTypeDetails: CreateInvoiceTypeAttributes): boolean => {

    const nameEntered = invoiceTypeDetails.name.length > 0;

    return (
        nameEntered
    )
   
}

export default isInvoiceTypeFormValid