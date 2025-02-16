import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { ContactResponseData } from "../../../../../../types/contact.types"
import ContactDeactivate from "./components/ContactDeactivate/ContactDeactivate"
import ContactSideBarSkeleton from "./components/ContactSideBarSkeleton"
import ContactActions from "./components/ContactActions/ContactActions"
import { CustomerResponseData } from "../../../../../../types/customers.types"
import { SiteCollectionResponse } from "../../../../../../types/sites.types"
import getAPI from "../../../../../../utils/getAPI"
import ContactAssociatedData from "./components/ContactAssociatedData/ContactAssociatedData"
import { ContactActivityCollectionResponse } from "../../../../../../types/contactActivity.types"
import ExportResource from "./components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../../../../components/PermsProtectedComponent"

const ContactSideBar = (props: {
    contact: ContactResponseData | undefined,
    customer: CustomerResponseData | undefined,
    setContactData: Dispatch<SetStateAction<ContactResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
}) => {

    const [isSitesLoading, setIsSiteLoading] = useState(true);
    const [sitesData, setSitesData] = useState<SiteCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<ContactActivityCollectionResponse>();

    useEffect(() => {
        if (props.contact?.id === undefined) return;
        getSites(props.contact.id);
    }, [JSON.stringify(props.contact)]);

    useEffect(() => {
        if (props.contact?.id === undefined) return;
        getActivity(props.contact.id);
    }, [JSON.stringify(props.contact), JSON.stringify(sitesData)]);

    const getSites = (contactID: number) => {
        getAPI(`sites`, {
            contact_id: contactID,
            is_active: true,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSitesData(siteData);
        }, setIsSiteLoading);
    }

    const getActivity = (contactID: number) => {
        getAPI(`contact_activity`, {
            contact_id: contactID,
            perPage: 1
        }, (response: any) => {
            const contactActivityData: ContactActivityCollectionResponse = response.data;
            setActivityData(contactActivityData);
        }, setIsActivityLoading)    
    } 

    const isSideBarLoading = (
        isSitesLoading ||
        isActivityLoading
    )

    return (
        !isSideBarLoading && props.contact && props.customer && sitesData && activityData ? 
            !props.isEditMode ?  <>
                {props.contact.data.is_active ?
                    <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                        <ContactActions
                            contactID={props.contact.id}
                            customer={props.customer}
                            setContactData={props.setContactData}
                            setIsEditMode={() => props.setIsEditMode(true)}     
                            getSites={getSites}
                        />
                    </PermsProtectedComponent>
                : null}
                <ContactAssociatedData
                    contactID={props.contact.id}
                    siteCount={sitesData.total_count}
                    activityCount={activityData.total_count}
                />
                <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                    <ContactDeactivate 
                        contactID={props.contact.id} 
                        setContactData={props.setContactData}
                        reactivate={!props.contact.data.is_active} 
                    />
                </PermsProtectedComponent>

                <ExportResource 
                    resourceName="Contact"
                    resourceData={props.contact}
                />
            </> 
            :
            // Edit Mode
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Abandon Edit'
                    color="grey"
                    iconFont='cancel'
                    clickEvent={() => props.setIsEditMode(false)}
                />
            </SideBarModule>
        :
        // Skeleton
        <ContactSideBarSkeleton/>
    )
}

export default ContactSideBar