import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ContactCollectionResponse } from "../../../../../../../../../types/contact.types";
import getAPI from "../../../../../../../../../utils/getAPI";
import ContactsList from "../../../../../../../Contacts/ContactsListPage/components/ContactsList";
import ContactSearchHeader from "../../../../../../../Contacts/components/ContactSearchHeader";
import getContactSearchParams from "../../../../../../../Contacts/utils/getContactSearchParams";
import ContactAdvancedSearch from "../../../../../../../Contracts/components/ContractAdvancedSearch";

const SiteContactList = (props: {
    siteID: number,
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
                title='Site Contacts'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1200}
                top
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

export default SiteContactList