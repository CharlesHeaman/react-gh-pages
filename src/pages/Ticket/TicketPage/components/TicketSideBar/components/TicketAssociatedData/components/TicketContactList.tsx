import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import getContactSearchParams from "../../../../../../../CustomerAdmin/Contacts/utils/getContactSearchParams";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ContactCollectionResponse } from "../../../../../../../../types/contact.types";
import getAPI from "../../../../../../../../utils/getAPI";
import ContactsList from "../../../../../../../CustomerAdmin/Contacts/ContactsListPage/components/ContactsList";
import ContactSearchHeader from "../../../../../../../CustomerAdmin/Contacts/components/ContactSearchHeader";
import ContactAdvancedSearch from "../../../../../../../CustomerAdmin/Contracts/components/ContractAdvancedSearch";

const TicketContactList = (props: {
    customerID: number,
    siteID: number | undefined,
    show: boolean,
    hideFunc: () => void,
    totalCount: number,
}) => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isContactLoading, setIsContactLoading] = useState(false);
    const [contactData, setContactData] = useState<ContactCollectionResponse>();

    // Search Parameters 
    const contactSearchParams = getContactSearchParams(searchParams);
    
    useEffect(() => {
        searchContacts();
    }, [props.siteID, JSON.stringify(contactSearchParams)])

    const searchContacts = () => {
        setShowAdvancedSearch(false);
        getAPI('contacts', {
            customer_ids: [props.customerID],
            site_id: props.siteID,
            ...contactSearchParams,
        }, (response: any) => {
            const contactData: ContactCollectionResponse = response.data;
            setContactData(contactData);
        }, setIsContactLoading);
    }

    return (
        <>
            <WindowOverlay
                title='Ticket Contacts'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1200}
            >
                <ContactSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    siteID={props.siteID}
                />
                <ContactsList 
                    hasSearched={true} 
                    isContactsLoading={isContactLoading} 
                    contacts={contactData} 
                    perPage={contactSearchParams.perPage}     
                    totalCount={props.totalCount}          
                    hideCustomer
                />
            </WindowOverlay>

            <ContactAdvancedSearch 
                show={showAdvancedSearch} 
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default TicketContactList