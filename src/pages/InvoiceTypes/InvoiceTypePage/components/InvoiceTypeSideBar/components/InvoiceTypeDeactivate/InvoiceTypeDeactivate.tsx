import { Dispatch, SetStateAction, useState } from "react"
import DeactivateModule from "../../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { InvoiceTypeResponseData } from "../../../../../../../types/invoiceTypes.types";
import putAPI from "../../../../../../../utils/putAPI";

const InvoiceTypeDeactivate = (props: {
    invoiceTypeID: number,
    reactivate: boolean,
    setInvoiceTypeData: Dispatch<SetStateAction<InvoiceTypeResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateInvoiceType = () => {
        putAPI(`invoice_types/${props.invoiceTypeID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const invoiceTypeData: InvoiceTypeResponseData = response.data;
            props.setInvoiceTypeData(invoiceTypeData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Invoice Type'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Invoice Type"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateInvoiceType}/>
        </>

    )
}

export default InvoiceTypeDeactivate