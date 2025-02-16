import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SubmitButton from "../../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { SiteContactCollectionResponse, SiteContactResponseData } from "../../../../../../../../../types/siteContact.types";
import { SiteCollectionResponse, SiteResponseData } from "../../../../../../../../../types/sites.types";
import deleteAPI from "../../../../../../../../../utils/deleteAPI";
import getAPI from "../../../../../../../../../utils/getAPI";
import postAPI from "../../../../../../../../../utils/postAPI";
import SiteSelectList from "../../../../../../../Sites/components/SiteSelectList";
import ContactSelectList from "../../../../../../../Contacts/ContactsListPage/components/ContactSelectList";
import { ContactCollectionResponse, ContactResponseData } from "../../../../../../../../../types/contact.types";
import GridItem from "../../../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";

export interface NewSelectItem {
    id: number,
    selected: boolean,
}

const SelectSiteAssignedContacts = (props: {
    siteID: number,
    customerID: number,
    getContacts: (contactID: number) => void,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Form States 
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [startSelectedContacts, setStartSelectedContacts] = useState<Array<NewSelectItem>>([]);
    const [selectedContacts, setSelectedContacts] = useState<Array<NewSelectItem>>([]);
    
    // Data States
    const [isCustomerContactsLoading, setIsCustomerContactsLoading] = useState(false);
    const [customerContactData, setCustomerContactData] = useState<ContactCollectionResponse>();
    const [isSiteContactsLoading, setIsSiteContactsLoading] = useState(false);
    const [siteContactsData, setSiteContactsData] = useState<Array<SiteContactResponseData>>([]);

    useEffect(() => {
        getCustomerContacts();
    }, [props.customerID, props.siteID])

    const getCustomerContacts = () => {
        getAPI('contacts', {
            customer_ids: [props.customerID],
            is_active: true
        }, (response: any) => {
            const contactData: ContactCollectionResponse = response.data;
            setCustomerContactData(contactData);
            getSiteContacts(contactData.data)
        }, setIsCustomerContactsLoading);
    }

    const getSiteContacts = (customerContacts: Array<ContactResponseData>) => {
        getAPI('site_contacts', {
            site_ids: [props.siteID]
        }, (response: any) => {
            const siteContactsData: SiteContactCollectionResponse = response.data;
            setSiteContactsData(siteContactsData.data);
            const assignedSiteIDs: Array<number> = siteContactsData.data.map(assignedSite => assignedSite.data.contact_id);
            const selectedContacts: Array<NewSelectItem> = customerContacts.map(contact => {
                return {
                    id: contact.id,
                    selected: assignedSiteIDs.includes(contact.id)
                }
            })
            setStartSelectedContacts(selectedContacts);
            setSelectedContacts(selectedContacts);
        }, setIsSiteContactsLoading);
    }

    const updateSelection = (contactID: number) => {
        setSelectedContacts(prevState => 
            prevState.map(selectItem => {
                if (contactID === selectItem.id) {
                    return {
                        ...selectItem,
                        selected: !selectItem.selected
                    }
                }
                return selectItem
            })
        )
    }

    const updateAssignedContacts = () => {
        const updatedContacts: Array<NewSelectItem> = selectedContacts.filter((contact, index) => 
            contact.selected !== startSelectedContacts[index].selected
        );

        // Format Create Objects
        const createItems = updatedContacts.filter(contact => contact.selected);
        const createObjects = createItems.map(contact => {
            return {
                site_id: props.siteID,
                contact_id: contact.id
            }
        });

        // Format Delete IDs 
        const deleteItems = updatedContacts.filter(site => !site.selected);
        const deleteIDs = deleteItems.map(contact => siteContactsData.find(siteContact => siteContact.data.contact_id === contact.id)?.id);
        const updatedDeleteIDs = deleteIDs.filter(id => id !== undefined) as Array<number>;

        createSiteContacts(createObjects, updatedDeleteIDs);
    }

    const createSiteContacts = (createObjects: any, deleteIDs: Array<number>) => {
        postAPI('site_contacts/create_collection', {}, {
            site_contacts: createObjects
        }, () => deleteSiteContacts(deleteIDs), setIsCreating);
    }

    const deleteSiteContacts = (deleteIDs: Array<number>) => {
        deleteAPI('site_contacts/delete_collection', {
            site_contact_ids: deleteIDs
        }, () => {
            props.getContacts(props.siteID)
        }, setIsDeleting);
    }

    return (
        <WindowOverlay
            title='Select Assigned Contacts'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={900}
            footer={<SubmitButton
                text="Select Assigned Contacts"
                iconFont="checklist_rtl"
                clickFunc={updateAssignedContacts}
                submitting={isCreating || isDeleting}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select contacts to assign to this site.</p>
                </GridItem>
                <GridItem>
                    <ContactSelectList 
                        hasSearched={true} 
                        isContactsLoading={isCustomerContactsLoading || isSiteContactsLoading}
                        selectedIDs={selectedContacts.filter(selectItem => selectItem.selected).map(selectItem => selectItem.id)}
                        updateSelection={updateSelection}
                        contacts={customerContactData}
                        perPage={10}
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default SelectSiteAssignedContacts