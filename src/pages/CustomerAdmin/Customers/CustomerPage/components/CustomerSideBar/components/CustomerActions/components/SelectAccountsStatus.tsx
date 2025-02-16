import { Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../../../../../../components/form/SubmitButton/SubmitButton"
import GridItem from "../../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { CustomerResponseData } from "../../../../../../../../../types/customers.types"
import putAPI from "../../../../../../../../../utils/putAPI"
import AccountsStatusSelect from "../../../../../../components/AccountsStatutsSelect"

const SelectAccountsStatus = (props: {
    customerID: number,
    accountsStatus: number,
    setCustomerData: Dispatch<SetStateAction<CustomerResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {
    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [accountsStatus, setAccountsStatus] = useState<number>(props.accountsStatus ? props.accountsStatus : 0);
    
    const updateCustomer = () => {
        putAPI(`customers/${props.customerID}/update_accounts_status`, {}, {
            accounts_status: accountsStatus
        }, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            props.setCustomerData(customerData);
            props.hideFunc();
            setAccountsStatus(accountsStatus);
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Update Customer Accounts Status'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Select Status"
                clickFunc={updateCustomer}
                iconFont="payments"
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select accounts status for this customer.</p>
                </GridItem>
                <GridItem title='Accounts Status'>
                    <AccountsStatusSelect
                        selectedAccountsStatus={accountsStatus}
                        setSelectedAccountsStatus={setAccountsStatus}
                    />
                </GridItem>
            </InfoGrid>


            
        </WindowOverlay>
    )
}

export default SelectAccountsStatus