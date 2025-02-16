import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SubmitButton from "../../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { SiteCollectionResponse, SiteResponseData } from "../../../../../../../../../types/sites.types";
import getAPI from "../../../../../../../../../utils/getAPI";
import putAPI from "../../../../../../../../../utils/putAPI";
import SiteSelectList from "../../../../../../../Sites/components/SiteSelectList";
import deleteAPI from "../../../../../../../../../utils/deleteAPI";
import postAPI from "../../../../../../../../../utils/postAPI";
import { SiteContactCollectionResponse, SiteContactResponseData } from "../../../../../../../../../types/siteContact.types";
import InfoGrid from "../../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import GridItem from "../../../../../../../../../components/ui/Containers/GridItem/GridItem";

export interface NewSelectItem {
    id: number,
    selected: boolean,
}

const SelectContactAssignedSites = (props: {
    contactID: number,
    customerID: number,
    getSites: (contactID: number) => void,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Form States 
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [startSelectedSites, setStartSelectedSites] = useState<Array<NewSelectItem>>([]);
    const [selectedSites, setSelectedSites] = useState<Array<NewSelectItem>>([]);
    
    // Data States
    const [isCustomerSitesLoading, setIsCustomerSitesLoading] = useState(false);
    const [customerSiteData, setCustomerSiteData] = useState<SiteCollectionResponse>();
    const [isSiteContactsLoading, setIsSiteContactsLoading] = useState(false);
    const [siteContactsData, setSiteContactsData] = useState<Array<SiteContactResponseData>>([]);

    useEffect(() => {
        getCustomerSites();
    }, [props.customerID, props.contactID])

    const getCustomerSites = () => {
        getAPI('sites', {
            customer_ids: [props.customerID],
            is_active: true
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setCustomerSiteData(siteData);
            getSiteContacts(siteData.data)
        }, setIsCustomerSitesLoading);
    }

    const getSiteContacts = (customerSites: Array<SiteResponseData>) => {
        getAPI('site_contacts', {
            contact_ids: [props.contactID]
        }, (response: any) => {
            const siteContactsData: SiteContactCollectionResponse = response.data;
            setSiteContactsData(siteContactsData.data);
            const assignedSiteIDs: Array<number> = siteContactsData.data.map(assignedSite => assignedSite.data.site_id);
            const selectedSites: Array<NewSelectItem> = customerSites.map(site => {
                return {
                    id: site.id,
                    selected: assignedSiteIDs.includes(site.id)
                }
            })
            setStartSelectedSites(selectedSites);
            setSelectedSites(selectedSites);
        }, setIsSiteContactsLoading);
    }

    const updateSelection = (siteID: number) => {
        setSelectedSites(prevState => 
            prevState.map(selectItem => {
                if (siteID === selectItem.id) {
                    return {
                        ...selectItem,
                        selected: !selectItem.selected
                    }
                }
                return selectItem
            })
        )
    }

    const updateAssignedSites = () => {
        const updatedSites: Array<NewSelectItem> = selectedSites.filter((site, index) => 
            site.selected !== startSelectedSites[index].selected
        );

        // Format Create Objects
        const createItems = updatedSites.filter(site => site.selected);
        const createObjects = createItems.map(site => {
            return {
                contact_id: props.contactID,
                site_id: site.id
            }
        });

        // Format Delete IDs 
        const deleteItems = updatedSites.filter(site => !site.selected);
        const deleteIDs = deleteItems.map(site => siteContactsData.find(siteContact => siteContact.data.site_id === site.id)?.id);
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
            props.getSites(props.contactID)
        }, setIsDeleting);
    }

    return (
        <>
            <WindowOverlay
                title='Select Assigned Sites'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1000}
                footer={<SubmitButton
                    text="Select Assigned Sites"
                    iconFont="checklist_rtl"
                    clickFunc={updateAssignedSites}
                    submitting={isCreating || isDeleting}
                    submittingText="Updating..."
                />}
            >
                <InfoGrid>
                    <GridItem>
                        <p>Select sites to assign this contact to.</p>
                    </GridItem>
                    <GridItem>
                        <SiteSelectList 
                            hasSearched={true} 
                            isSitesLoading={isCustomerSitesLoading || isSiteContactsLoading}
                            selectedIDs={selectedSites.filter(selectItem => selectItem.selected).map(selectItem => selectItem.id)}
                            updateSelection={updateSelection}
                            hideDepartment
                            sites={customerSiteData}
                            perPage={10}
                        />
                    </GridItem>
                </InfoGrid>
            </WindowOverlay>

        </>
    )
}

export default SelectContactAssignedSites