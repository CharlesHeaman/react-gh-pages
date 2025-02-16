import { ChangeEvent } from "react";
import CodeInput from "../../../../../components/form/CodeInput/CodeInput";
import EmailInput from "../../../../../components/form/EmailInput/EmailInput";
import TelephoneInput from "../../../../../components/form/TelephoneInput/TelephoneInput";
import TextInput from "../../../../../components/form/TextInput/TextInput";
import TextareaInput from "../../../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateCustomerAttributes } from "../../../../../types/customers.types";

const CustomerDetailsForm = (props: {
    customerDetails: CreateCustomerAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    customerCodeUnique: boolean,
    checkUniqueCustomerCode: () => void,
    showErrors: boolean,
    isEdit?: boolean,
}) => {

    return (
        <section>
            {props.isEdit && <h2>Customer Details</h2>}
            <InfoGrid>
                <GridItem title='Name' span={4}>
                    <TextInput
                        name="name"
                        label="Name"
                        value={props.customerDetails.name}
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}
                        required
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Code' span={2}>
                    <CodeInput
                        name="code"
                        value={props.customerDetails.code}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        isUnique={props.customerCodeUnique}
                        checkUnique={props.checkUniqueCustomerCode}
                        required
                    />
                </GridItem>
                <GridItem title='Email' span={4}>
                    <EmailInput
                        name="email" 
                        value={props.customerDetails.email}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Telephone' span={2}>
                    <TelephoneInput 
                        name={"telephone"} 
                        value={props.customerDetails.telephone} 
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Special Instructions' secondaryTitle="(optional)">
                    <TextareaInput
                        name="special_instructions"
                        label="Special instructions"
                        value={props.customerDetails.special_instructions}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default CustomerDetailsForm