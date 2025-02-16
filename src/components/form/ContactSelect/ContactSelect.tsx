import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import { ContactResponseData, ContactCollectionResponse } from "../../../types/contact.types";

const ContactSelect = (props: {
    selectedContact: ContactResponseData | undefined,
    setSelectedContact: Dispatch<SetStateAction<ContactResponseData | undefined>>,
    required?: boolean,
    customerID?: number,
    hasSubmitted: boolean
}) => {
    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isContactsLoading, setIsContactsLoading] = useState(false);
    const [contactsData, setContactsData] = useState<ContactCollectionResponse>();

    useEffect(() => {
        getContacts();
    }, [searchTerm, props.customerID])

    const getContacts = () => {
        getAPI('contacts', {
            code_or_name_like: searchTerm,
            customer_ids: props.customerID ? [props.customerID] : undefined,
            is_active: true,
        }, (response: any) => {
            const contactsData: ContactCollectionResponse = response.data;
            setContactsData(contactsData);
        }, setIsContactsLoading);
    }

    const showRequired = props.selectedContact === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="contact_phone"
                resourceName="contact"
                resourceNamePlural="contacts"
                selectedText={props.selectedContact?.data.name}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={contactsData ? contactsData.data.map(contact => {
                    return {
                        text: contact.data.name,
                        clickFunc: () => props.setSelectedContact(contact),
                        selected: props.selectedContact?.id === contact.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Contact is required`}
                show={showRequired}
            />}
        </>
    )
}

export default ContactSelect