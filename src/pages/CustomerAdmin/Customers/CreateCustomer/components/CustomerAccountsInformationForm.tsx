import { ChangeEvent } from "react";
import EmailInput from "../../../../../components/form/EmailInput/EmailInput";
import PercentageInput from "../../../../../components/form/PercentageInput/PercentageInput";
import TextInput from "../../../../../components/form/TextInput/TextInput";
import TextareaInput from "../../../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateCustomerAttributes } from "../../../../../types/customers.types";

const CustomerAccountsInformationForm = (props: {
    customerDetails: CreateCustomerAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean,
}) => {

    return (
        <section>
            {props.isEdit && <h2>Accounts Information</h2>}
            <InfoGrid>
                {/* <GridItem title='Sage Name' span={3} secondaryTitle="(optional)">
                    <TextInput
                        name="sage_name"
                        label="Sage name"
                        value={props.customerDetails.sage_name}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        autoFocus={!props.isEdit}                            
                    />
                </GridItem> */}
                <GridItem title='Accounts Email' span={3}>
                    <EmailInput
                        name="accounts_email"
                        label="Accounts email"
                        value={props.customerDetails.accounts_email}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        autoFocus
                        required                            
                    />
                </GridItem>
                <GridItem title='Invoice Address' span={4}>
                    <TextareaInput
                        name="invoice_address"
                        label="Invoice address"
                        minRows={3}
                        value={props.customerDetails.invoice_address}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Accounts Notes' secondaryTitle="(optional)">
                    <TextareaInput
                        name="accounts_notes"
                        label="Accounts notes"
                        value={props.customerDetails.accounts_notes}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default CustomerAccountsInformationForm