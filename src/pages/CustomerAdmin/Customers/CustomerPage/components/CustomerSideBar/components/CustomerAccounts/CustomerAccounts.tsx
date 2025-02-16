import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { CustomerResponseData } from "../../../../../../../../types/customers.types"
import SelectAccountsStatus from "../CustomerActions/components/SelectAccountsStatus"
import UpdateCustomerSageName from "../CustomerActions/components/UpdateCustomerSageName"

const CustomerAccounts = (props: {
    customer: CustomerResponseData
    setCustomerData: Dispatch<SetStateAction<CustomerResponseData | undefined>>,
}) => {
    const [showSelectStatus, setShowSelectStatus] = useState(false);
    const [showAddSageName, setShowAddSageName] = useState(false);

    return (
        <>
            <SideBarModule title='Accounts'>
                <SideBarButton 
                    text='Update Accounts Status'
                    iconFont='payments'
                    clickEvent={() => setShowSelectStatus(true)}
                />
                <SideBarButton 
                    text='Update Sage Name'
                    iconFont='add_card'
                    clickEvent={() => setShowAddSageName(true)}
                />
            </SideBarModule>
             
            <SelectAccountsStatus
                customerID={props.customer.id}
                accountsStatus={props.customer.data.accounts_status}            
                setCustomerData={props.setCustomerData}
                show={showSelectStatus}
                hideFunc={() => setShowSelectStatus(false)} 
            />

            <UpdateCustomerSageName
                customerID={props.customer.id}
                sageName={props.customer.data.sage_name}            
                setCustomerData={props.setCustomerData}
                show={showAddSageName}
                hideFunc={() => setShowAddSageName(false)} 
            />
        </>
    )
}

export default CustomerAccounts