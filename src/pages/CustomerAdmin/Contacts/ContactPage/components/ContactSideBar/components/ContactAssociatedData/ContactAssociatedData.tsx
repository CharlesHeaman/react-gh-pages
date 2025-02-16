import { useState } from "react";
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import ContactHistory from "./ContactHistory";
import ContactSitesList from "./ContactSitesList";

const ContactAssociatedData = (props: {
    contactID: number,
    siteCount: number,
    activityCount: number,
}) => {
    const [showSites, setShowSites] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Contact'>
                <SideBarButton 
                    text={`Assigned Sites (${props.siteCount})`}
                    iconFont='business'
                    clickEvent={() => setShowSites(true)}
                />
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <ContactSitesList
                contactID={props.contactID}
                totalCount={props.siteCount}
                show={showSites}
                hideFunc={() => setShowSites(false)}
            />

            <ContactHistory
                contactID={props.contactID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default ContactAssociatedData