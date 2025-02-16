import { Dispatch, SetStateAction, useState } from "react";
import DeactivateModule from "../../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { SupplierContactResponseData } from "../../../../../../../types/supplierContact.types";
import putAPI from "../../../../../../../utils/putAPI";

const SupplierContactDeactivate = (props: {
    contactID: number,
    reactivate: boolean,
    setContactData: Dispatch<SetStateAction<SupplierContactResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateCustomer = () => {
        putAPI(`supplier_contacts/${props.contactID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const contactData: SupplierContactResponseData = response.data;
            props.setContactData(contactData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Contact'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Contact"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateCustomer}/>
        </>

    )
}

export default SupplierContactDeactivate