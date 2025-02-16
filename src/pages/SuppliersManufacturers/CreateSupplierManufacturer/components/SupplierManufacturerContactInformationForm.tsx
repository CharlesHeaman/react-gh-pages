import { ChangeEvent } from "react";
import EmailInput from "../../../../components/form/EmailInput/EmailInput";
import TelephoneInput from "../../../../components/form/TelephoneInput/TelephoneInput";
import URLInput from "../../../../components/form/URLInput/URLInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateSupplierManufacturerAttributes } from "../../../../types/supplierManufacturer.types";

const SupplierManufacturerContactInformationForm = (props: {
    supplierManufacturerDetails: CreateSupplierManufacturerAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean,
}) => {
    return (
        <section>
            {props.isEdit && <h2>Contact Information</h2>}
            <InfoGrid>                
                <GridItem title='Email' span={3}>
                    <EmailInput
                        name="email"
                        label="Email"
                        value={props.supplierManufacturerDetails.email}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                        autoFocus={!props.isEdit}
                    />
                </GridItem>
                <GridItem title='Telephone' span={3}>
                    <TelephoneInput
                        name="telephone"
                        label="Telephone"
                        value={props.supplierManufacturerDetails.telephone}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Website' span={3} secondaryTitle="(optional)">
                    <URLInput
                        name="website_url"
                        label="Website"
                        value={props.supplierManufacturerDetails.website_url}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default SupplierManufacturerContactInformationForm