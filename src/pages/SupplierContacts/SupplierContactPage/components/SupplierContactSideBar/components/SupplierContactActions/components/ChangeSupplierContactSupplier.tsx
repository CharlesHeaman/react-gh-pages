import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { SupplierContactResponseData } from "../../../../../../../../types/supplierContact.types";
import putAPI from "../../../../../../../../utils/putAPI";
import { SupplierManufacturerResponseData } from "../../../../../../../../types/supplierManufacturer.types";
import SupplierSelect from "../../../../../../../../components/form/SupplierSelect/SupplierSelect";

const ChangeSupplierContactSupplier = (props: {
    contactID: number,
    supplier: SupplierManufacturerResponseData,
    setContactData: Dispatch<SetStateAction<SupplierContactResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {
    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<SupplierManufacturerResponseData | undefined>(props.supplier);    

    const updateContact = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`supplier_contacts/${props.contactID}/change_supplier_manufacturer`, {}, {
            supplier_manufacturer_id: selectedSupplier?.id,
        }, (response: any) => {
            const contactData: SupplierContactResponseData = response.data;
            props.setContactData(contactData);
            props.hideFunc();
            setSelectedSupplier(selectedSupplier);
        }, setIsUpdating)
    }

    const formComplete = selectedSupplier?.id !== undefined;

    return (
        <WindowOverlay
            title='Change Supplier/Manufacturer'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Change Supplier/Manufacturer"
                iconFont="warehouse"
                disabled={hasSubmitted && !formComplete} 
                clickFunc={updateContact}
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select a supplier/manufacturer to move this contact to.</p>
                </GridItem>
                <GridItem title='Supplier'>
                    <SupplierSelect 
                        selectedSupplier={selectedSupplier} 
                        setSelectedSupplier={setSelectedSupplier}
                        hasSubmitted                 
                    />
                </GridItem>
            </InfoGrid>

           
        </WindowOverlay>
    )
}

export default ChangeSupplierContactSupplier