import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { SupplierManufacturerResponseData } from "../../../../../../types/supplierManufacturer.types";
import UpdateISOApproval from "./SupplierManufacturerISOApproval/components/UpdateISOApproval";

const SupplierManufacturerISO = (props: {
    supplierManufacturerID: number,
    isApproved: boolean | null,
    setSupplierManufacturerData: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>,
}) => {
    const [showUpdate, setShowUpdate] = useState(false);

    return (
        <>
            <SideBarModule title="ISO">
                <SideBarButton
                    text="Update ISO Approval"
                    iconFont="grading"
                    clickEvent={() => setShowUpdate(true)}
                />
            </SideBarModule>

            <UpdateISOApproval
                supplierManufacturerID={props.supplierManufacturerID}
                setSupplierManufacturerData={props.setSupplierManufacturerData}
                isApproved={props.isApproved}
                show={showUpdate}
                hideFunc={() => setShowUpdate(false)}
            />
        </>
    )
}

export default SupplierManufacturerISO