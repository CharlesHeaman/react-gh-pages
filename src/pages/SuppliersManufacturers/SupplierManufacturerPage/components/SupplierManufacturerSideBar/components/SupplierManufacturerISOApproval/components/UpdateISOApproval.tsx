import { Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { SupplierManufacturerResponseData } from "../../../../../../../../types/supplierManufacturer.types"
import putAPI from "../../../../../../../../utils/putAPI"
import ISOApprovalSelect from "../../../../ISOApprovalSelect"

const UpdateISOApproval = (props: {
    supplierManufacturerID: number,
    isApproved: boolean | null,
    setSupplierManufacturerData: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>
    show: boolean,
    hideFunc: () => void,
}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedApproval, setSelectedApproval] = useState<boolean | null>(props.isApproved);

    const updateSupplierManufacturer = () => {
        putAPI(`suppliers_manufacturers/${props.supplierManufacturerID}/update_iso_approval`, {}, {
            is_approved: selectedApproval
        }, (response: any) => {
            const supplierManufacturerData: SupplierManufacturerResponseData = response.data;
            props.setSupplierManufacturerData(supplierManufacturerData);
            props.hideFunc();
            setSelectedApproval(selectedApproval);
        }, setIsUpdating)
    }

    return (
        <WindowOverlay 
            title={"Update Supplier/Manufacturer ISO Approval"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc} 
            footer={<SubmitButton
                text="Update ISO Approval"
                iconFont="grading"
                clickFunc={updateSupplierManufacturer}
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <p>Select ISO approval status for this supplier/manufacturer.</p>
            <ISOApprovalSelect 
                selectedISOApproval={selectedApproval} 
                setSelectedISOApproval={setSelectedApproval}            
            />    
        </WindowOverlay>
    )
}

export default UpdateISOApproval