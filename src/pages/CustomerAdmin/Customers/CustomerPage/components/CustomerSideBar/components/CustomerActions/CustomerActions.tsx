import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { CustomerResponseData } from "../../../../../../../../types/customers.types"

const CustomerActions = (props: {
    customer: CustomerResponseData
    setCustomerData: Dispatch<SetStateAction<CustomerResponseData | undefined>>,
    setIsEditMode: () => void,
}) => {
    const [showSelectStatus, setShowSelectStatus] = useState(false);
    const [showNonContractRates, setShowNonContractRates] = useState(false);

    return (
        <>
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Edit Customer'
                    color="orange"
                    iconFont='edit'
                    clickEvent={props.setIsEditMode}
                />
            </SideBarModule>
        </>
    )
}

export default CustomerActions