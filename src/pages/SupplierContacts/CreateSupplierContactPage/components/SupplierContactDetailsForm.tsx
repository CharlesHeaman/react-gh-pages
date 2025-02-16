import { ChangeEvent } from "react";
import { CreateSupplierContactAttributes } from "../../../../types/supplierContact.types";
import EmailInput from "../../../../components/form/EmailInput/EmailInput";
import TelephoneInput from "../../../../components/form/TelephoneInput/TelephoneInput";
import TextInput from "../../../../components/form/TextInput/TextInput";
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";


const SupplierContactDetailsForm = (props: {
    contactDetails: CreateSupplierContactAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Contact Details</h2>}
            <InfoGrid>                    
                <GridItem title='Name' span={3}>
                    <TextInput
                        name="name"
                        value={props.contactDetails.name}
                        label="Name"
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}
                        required
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Email' span={3}>
                    <EmailInput
                        name="email"
                        value={props.contactDetails.email}
                        label="Email"
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Telephone' span={3}>
                    <TelephoneInput
                        name="telephone"
                        value={props.contactDetails.telephone}
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Mobile' secondaryTitle="(optional)" span={3}>
                    <TelephoneInput
                        name="mobile"
                        label="Mobile"
                        value={props.contactDetails.mobile}
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Notes' secondaryTitle="(optional)">
                    <TextareaInput
                        name="notes"
                        value={props.contactDetails.notes}
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default SupplierContactDetailsForm