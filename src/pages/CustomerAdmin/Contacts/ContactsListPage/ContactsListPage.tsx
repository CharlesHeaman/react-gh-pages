import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import { ContactCollectionResponse } from "../../../../types/contact.types";
import getAPI from "../../../../utils/getAPI";
import CustomerAdminNavigation from "../../components/CustomerAdminNavigation";
import ContactSearchHeader from "../components/ContactSearchHeader";
import getContactSearchParams from "../utils/getContactSearchParams";
import ContactAdvancedSearch from "./components/ContactAdvancedSearch";
import ContactsList from "./components/ContactsList";

const ContactListPage = () => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isContactLoading, setIsContactLoading] = useState(false);
    const [contactData, setContactData] = useState<ContactCollectionResponse>();

    // Search Parameters 
    const hasSearched = searchParams.get(`contacts_has_searched`) === "true";
    const contactSearchParams = getContactSearchParams(searchParams);

    useEffect(() => {
        hasSearched && searchContacts();
    }, [JSON.stringify(contactSearchParams)])

    const searchContacts = () => {
        setShowAdvancedSearch(false);
        getAPI('contacts', contactSearchParams, (response: any) => {
            const contactData: ContactCollectionResponse = response.data;
            setContactData(contactData);
        }, setIsContactLoading);
    }

    return (
        <>
            <CustomerAdminNavigation location='contacts'/>
            <OuterContainer 
                title='Customer Contacts' 
                maxWidth={1400}
                description="Create, edit and deactivate customer contacts. Manage contacts assigned sites."
                noBorder
            >
                <ContactSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <ContactsList 
                    hasSearched={hasSearched} 
                    isContactsLoading={isContactLoading} 
                    contacts={contactData} 
                    perPage={contactSearchParams.perPage}
                    showAdvancedSearch={() => setShowAdvancedSearch(true)} 
                />
            </OuterContainer> 

            <ContactAdvancedSearch 
                show={showAdvancedSearch} 
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default ContactListPage