import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { SupplierManufacturerResponseData } from "../../../../../../types/supplierManufacturer.types";
import UpdateCustomerSageName from "./UpdateSupplierManufacturerSageName";

const SupplierManufacturerAccounts = (props: {
    supplierManufacturer: SupplierManufacturerResponseData,
    setSupplierManufacturerData: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>,
}) => {
    const [showAddSageName, setShowAddSageName] = useState(false);

    return (
        <>
            <SideBarModule title='Accounts'>
                <SideBarButton 
                    text='Update Sage Name'
                    iconFont='add_card'
                    clickEvent={() => setShowAddSageName(true)}
                />
            </SideBarModule>
             
            <UpdateCustomerSageName
                supplierID={props.supplierManufacturer.id}
                sageName={props.supplierManufacturer.data.sage_name}            
                setSupplierManufacturerData={props.setSupplierManufacturerData}
                show={showAddSageName}
                hideFunc={() => setShowAddSageName(false)} 
            />
        </>
    )
}

export default SupplierManufacturerAccounts