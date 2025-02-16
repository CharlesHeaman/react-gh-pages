import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { SupplierContactResponseData } from "../../../../../../../types/supplierContact.types"
import { SupplierManufacturerResponseData } from "../../../../../../../types/supplierManufacturer.types"
import ChangeSupplierContactSupplier from "./components/ChangeSupplierContactSupplier"

const SupplierContactActions = (props: {
    contactID: number,
    supplier: SupplierManufacturerResponseData,
    setContactData: Dispatch<SetStateAction<SupplierContactResponseData | undefined>>,
    setIsEditMode: () => void
}) => {
    const [showChangeCustomer, setShowChangeCustomer] = useState(false);

    return (
        <>
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Edit Contact'
                    color="orange"
                    iconFont='edit'
                    clickEvent={props.setIsEditMode}
                />
                <SideBarButton 
                    text='Change Supplier/Manufacturer'
                    iconFont='warehouse'
                    clickEvent={() => setShowChangeCustomer(true)}
                />
            </SideBarModule>

            <ChangeSupplierContactSupplier
                contactID={props.contactID}
                supplier={props.supplier}
                setContactData={props.setContactData}
                show={showChangeCustomer}
                hideFunc={() => setShowChangeCustomer(false)}
            />
        </>
    )
}

export default SupplierContactActions