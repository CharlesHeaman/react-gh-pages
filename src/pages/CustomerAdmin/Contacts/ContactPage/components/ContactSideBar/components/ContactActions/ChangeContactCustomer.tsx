import { Dispatch, SetStateAction, useState } from "react"
import CustomerSelect from "../../../../../../../../components/form/SelectCustomer/CustomerSelect";
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CustomerResponseData } from "../../../../../../../../types/customers.types";
import { SiteResponseData } from "../../../../../../../../types/sites.types";
import putAPI from "../../../../../../../../utils/putAPI";
import { ContactResponseData } from "../../../../../../../../types/contact.types";

const ChangeContactCustomer = (props: {
    contactID: number,
    customer: CustomerResponseData,
    setContactData: Dispatch<SetStateAction<ContactResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {
    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponseData | undefined>(props.customer);    

    const updateContact = () => {
        putAPI(`contacts/${props.contactID}/change_customer`, {}, {
            customer_id: selectedCustomer?.id,
        }, (response: any) => {
            const contactData: ContactResponseData = response.data;
            props.setContactData(contactData);
            props.hideFunc();
            setSelectedCustomer(selectedCustomer);
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Change Contact Customer'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Change Customer"
                iconFont="groups"
                disabled={selectedCustomer === undefined}
                clickFunc={updateContact}
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select a customer to move this contact to.</p>
                </GridItem>
                <GridItem>
                    <p>This will also unassign this contact from any assigned sites.</p>
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

export default ChangeContactCustomer