import { Dispatch, SetStateAction, useState } from "react"
import CustomerSelect from "../../../../../../../../../components/form/SelectCustomer/CustomerSelect"
import SubmitButton from "../../../../../../../../../components/form/SubmitButton/SubmitButton"
import GridItem from "../../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { CustomerResponseData } from "../../../../../../../../../types/customers.types"
import putAPI from "../../../../../../../../../utils/putAPI"
import { ContractResponseData } from "../../../../../../../../../types/contract.types"

const ChangeContractCustomer = (props: {
    contractID: number,
    customer: CustomerResponseData,
    show: boolean,
    setContractData: Dispatch<SetStateAction<ContractResponseData | undefined>>
    hideFunc: () => void
}) => {
    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponseData | undefined>(props.customer);    

    const updateContract = () => {
        putAPI(`contracts/${props.contractID}/change_customer`, {}, {
            customer_id: selectedCustomer?.id,
        }, (response: any) => {
            const contractData: ContractResponseData = response.data;
            props.setContractData(contractData);
            props.hideFunc();
            setSelectedCustomer(selectedCustomer);
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Change Contract Customer'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Change Customer"
                iconFont="groups"
                disabled={selectedCustomer === undefined}
                clickFunc={updateContract}
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select a customer to move this contract to.</p>
                </GridItem>
                <GridItem title='Customer'>
                    <CustomerSelect 
                        selectedCustomer={selectedCustomer} 
                        setSelectedCustomer={setSelectedCustomer}
                        hasSubmitted                 
                    />
                </GridItem>
            </InfoGrid>            
        </WindowOverlay>
    )
}

export default ChangeContractCustomer