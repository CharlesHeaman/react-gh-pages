import { ChangeEvent } from "react";
import EmailInput from "../../../../components/form/EmailInput/EmailInput";
import TelephoneInput from "../../../../components/form/TelephoneInput/TelephoneInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateUserAttributes } from "../../../../types/user.types";

const UserContactDetailsForm = (props: {
    userDetails: CreateUserAttributes,
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
                        value={props.userDetails.email}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                        autoFocus={!props.isEdit}
                    />
                </GridItem>
                <GridItem title='Mobile' span={3}>
                    <TelephoneInput
                        name="mobile"
                        label="Mobile"
                        value={props.userDetails.mobile}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default UserContactDetailsForm