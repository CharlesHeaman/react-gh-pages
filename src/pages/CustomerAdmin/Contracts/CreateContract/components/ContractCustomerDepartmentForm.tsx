import { ChangeEvent, Dispatch, SetStateAction } from "react";
import CustomerSelect from "../../../../../components/form/SelectCustomer/CustomerSelect";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateContractAttributes } from "../../../../../types/contract.types";
import { CustomerResponseData } from "../../../../../types/customers.types";

const ContractCustomerForm = (props: {
    selectedCustomer: CustomerResponseData | undefined,
    setSelectedCustomer: Dispatch<SetStateAction<CustomerResponseData | undefined>>
    contractDetails: CreateContractAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            <InfoGrid>
                <GridItem title='Customer'>
                    <CustomerSelect
                        selectedCustomer={props.selectedCustomer}
                        setSelectedCustomer={props.setSelectedCustomer}
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default ContractCustomerForm