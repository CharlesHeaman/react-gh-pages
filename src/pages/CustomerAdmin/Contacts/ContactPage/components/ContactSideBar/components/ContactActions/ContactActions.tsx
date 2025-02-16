import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { ContactResponseData } from "../../../../../../../../types/contact.types";
import { CustomerResponseData } from "../../../../../../../../types/customers.types";
import ChangeContactCustomer from "./ChangeContactCustomer";
import SelectContactAssignedSites from "./components/SelectContactAssignedSites";

const ContactActions = (props: {
    contactID: number,
    customer: CustomerResponseData,
    setContactData: Dispatch<SetStateAction<ContactResponseData | undefined>>,
    setIsEditMode: () => void,
    getSites: (contactID: number) => void
}) => {
    const [showChangeCustomer, setShowChangeCustomer] = useState(false);
    const [showSelectAssignedSites, setShowSelectAssignedSites] = useState(false);
    
    return (
        <>
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Edit Contact'
                    color="orange"
                    iconFont='edit'
                    clickEvent={props.setIsEditMode}
                />
                <SideBarButton 
                    text='Change Customer'
                    iconFont='groups'
                    clickEvent={() => setShowChangeCustomer(true)}
                />
                <SideBarButton 
                    text='Select Assigned Sites'
                    iconFont='checklist_rtl'
                    clickEvent={() => setShowSelectAssignedSites(true)}
                />
            </SideBarModule>

            <ChangeContactCustomer 
                contactID={props.contactID} 
                customer={props.customer} 
                setContactData={props.setContactData}
                show={showChangeCustomer} 
                hideFunc={() => setShowChangeCustomer(false)}            
            />

            <SelectContactAssignedSites
                customerID={props.customer.id}
                contactID={props.contactID}
                show={showSelectAssignedSites}
                hideFunc={() => setShowSelectAssignedSites(false)}
                getSites={props.getSites}
            />
        </>
    )
}

export default ContactActions