import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import FormStepNavigation from "../../../../../components/form/FormStepNavigation/FormStepNavigation";
import TextInput from "../../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateContractAttributes } from "../../../../../types/contract.types";
import InvoicePeriodSelect from "../../ContractPage/components/InvoicePeriodSelect";

const CreateContractAccountsInformationForm = (props: {
    contractDetails: CreateContractAttributes,
    invoicePeriod: number,
    setInvoicePeriod: Dispatch<SetStateAction<number>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Accounts Information</h2>}
            <InfoGrid>
                <GridItem title='Invoice Period' span={3}>
                    <InvoicePeriodSelect 
                        selectedInvoicePeriod={props.invoicePeriod} 
                        setSelectedInvoicePeriod={props.setInvoicePeriod}
                    />
                </GridItem>
                <GridItem title='Purchase Order Number' span={3} secondaryTitle="(optional)">
                    <TextInput
                        name="purchase_order_number"
                        value={props.contractDetails.purchase_order_number}
                        updateFunc={props.updateParams} 
                        label={"Purchase order number"} 
                        hasSubmitted={props.showErrors}                    
                    />                   
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default CreateContractAccountsInformationForm