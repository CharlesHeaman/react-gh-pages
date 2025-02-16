import { ChangeEvent } from "react";
import EmailInput from "../../../../components/form/EmailInput/EmailInput";
import TelephoneInput from "../../../../components/form/TelephoneInput/TelephoneInput";
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateSupplierManufacturerAttributes } from "../../../../types/supplierManufacturer.types";

const SupplierManufacturerAccountsInformationForm = (props: {
    supplierManufacturerDetails: CreateSupplierManufacturerAttributes,
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
                        value={props.supplierManufacturerDetails.sage_name}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        autoFocus={!props.isEdit}
                    />
                </GridItem> */}
                <GridItem title='Accounts Email' span={3}>
                    <EmailInput
                        name="accounts_email"
                        label="Accounts email"
                        value={props.supplierManufacturerDetails.accounts_email}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        autoFocus
                        required
                    />
                </GridItem>
                <GridItem title='Accounts Telephone' span={3}>
                    <TelephoneInput
                        name="accounts_telephone"
                        label="Accounts telephone"
                        value={props.supplierManufacturerDetails.accounts_telephone}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Remittance Address' span={3}>
                    <TextareaInput
                        name="remittance_address"
                        value={props.supplierManufacturerDetails.remittance_address}
                        minRows={3}
                        label="Remittance address"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}    
                        required                    
                    />
                </GridItem>
                <GridItem title='Accounts Notes' secondaryTitle="(optional)">
                    <TextareaInput
                        name="accounts_notes"
                        value={props.supplierManufacturerDetails.accounts_notes}
                        label="Accounts notes"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}                        
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default SupplierManufacturerAccountsInformationForm