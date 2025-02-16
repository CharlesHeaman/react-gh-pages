import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton";
import TextInput from "../../../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { SupplierManufacturerResponseData } from "../../../../../../types/supplierManufacturer.types";
import putAPI from "../../../../../../utils/putAPI";


const UpdateCustomerSageName = (props: {
    supplierID: number,
    sageName: string | null,
    setSupplierManufacturerData: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {
    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [sageName, setSageName] = useState<string>(props.sageName ? props.sageName : '');
    
    const updateCustomer = () => {
        putAPI(`suppliers_manufacturers/${props.supplierID}/update_sage_name`, {}, {
            sage_name: sageName
        }, (response: any) => {
            const supplierData: SupplierManufacturerResponseData = response.data;
            props.setSupplierManufacturerData(supplierData);
            props.hideFunc();
            setSageName(sageName);
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Update Supplier/Manufacturer Sage Name'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Update Sage Name"
                clickFunc={updateCustomer}
                iconFont="add_card"
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem title='Sage Name'>
                    <TextInput 
                        name={"sage_name"} 
                        value={sageName} 
                        updateFunc={(event) => setSageName(event.target.value)}
                        autoFocus
                        required
                    />
                </GridItem>
            </InfoGrid>


            
        </WindowOverlay>
    )
}

export default UpdateCustomerSageName