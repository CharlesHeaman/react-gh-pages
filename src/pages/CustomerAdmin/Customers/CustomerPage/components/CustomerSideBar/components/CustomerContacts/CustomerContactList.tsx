import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { ContactCollectionResponse } from "../../../../../../../../types/contact.types"
import getAPI from "../../../../../../../../utils/getAPI"
import ContactSearchHeader from "../../../../../../Contacts/components/ContactSearchHeader"
import ContactAdvancedSearch from "../../../../../../Contacts/ContactsListPage/components/ContactAdvancedSearch"
import ContactsList from "../../../../../../Contacts/ContactsListPage/components/ContactsList"
import getContactSearchParams from "../../../../../../Contacts/utils/getContactSearchParams"

const CustomerContactList = (props: {
    customerID: number,
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
    }, [props.customerID, JSON.stringify(contactSearchParams)])

    const searchContacts = () => {
        setShowAdvancedSearch(false);
        getAPI('contacts', {
            customer_ids: [props.customerID],
            ...contactSearchParams,
        }, (response: any) => {
            const contactData: ContactCollectionResponse = response.data;
            setContactData(contactData);
        }, setIsContactLoading);
    }

    return (
        <>
            <WindowOverlay
                title='Customer Contacts'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1000}
                top
            >
                <ContactSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    customerID={props.customerID}
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

export default CustomerContactList