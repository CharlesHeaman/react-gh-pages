import { ChangeEvent } from "react";
import PostcodeInput from "../../../../../components/form/PostcodeInput/PostcodeInput";
import TextareaInput from "../../../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateCustomerAttributes } from "../../../../../types/customers.types";

const CustomerLocationForm = (props: {
    customerDetails: CreateCustomerAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean,
}) => {
    return (
        <section>
            {props.isEdit && <h2>Location Information</h2>}
            <InfoGrid>                
                <GridItem title='Address' span={4}>
                    <TextareaInput
                        minRows={3}
                        name="address"
                        label="Address"
                        value={props.customerDetails.address}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}       
                        autoFocus                 
                        required
                    />
                </GridItem>
                <GridItem title='Postcode' span={2}>
                    <PostcodeInput
                        name="postcode"
                        value={props.customerDetails.postcode}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}                        
                        required
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default CustomerLocationForm