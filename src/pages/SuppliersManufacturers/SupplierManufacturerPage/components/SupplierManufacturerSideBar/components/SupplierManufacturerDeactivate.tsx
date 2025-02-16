import { Dispatch, SetStateAction, useState } from "react";
import DeactivateModule from "../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { SupplierManufacturerResponseData } from "../../../../../../types/supplierManufacturer.types";
import putAPI from "../../../../../../utils/putAPI";

const SupplierManufacturerDeactivate = (props: {
    supplierManufacturerID: number,
    reactivate: boolean,
    setSupplierManufacturerData: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>,
    contactCount: number
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateSupplierManufacturer = () => {
        putAPI(`suppliers_manufacturers/${props.supplierManufacturerID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const customerData: SupplierManufacturerResponseData = response.data;
            props.setSupplierManufacturerData(customerData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName="Supplier/Manufacturer"
                reactivate={props.reactivate}
                showFunc={() => setShowDeactivate(true)}
            />

            <DeactivateOverlay 
                resourceName="Supplier/Manufacturer"
                reactivate={props.reactivate} 
                additionalText={!props.reactivate ? 
                    props.contactCount > 0 ? <p>This will also deactivate all {props.contactCount} contacts.</p> : undefined
                    : undefined
                }
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateSupplierManufacturer}
            />
        </>
    )
}

export default SupplierManufacturerDeactivate