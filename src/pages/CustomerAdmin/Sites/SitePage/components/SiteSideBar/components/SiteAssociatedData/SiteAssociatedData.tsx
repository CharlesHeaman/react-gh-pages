import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import SiteEquipmentList from "../../../SiteEquipment/SiteEquipmentList"
import SiteContactList from "./components/SiteContactList"
import SiteHistory from "../../../../../components/SiteHistory"

const SiteAssociatedData = (props: {
    siteID: number,
    equipmentCount: number,
    contactCount: number,
    activityCount: number,
}) => {
    const [searchParams] = useSearchParams();

    const [showEquipment, setShowEquipment] = useState(searchParams.get("showEquipment") === "true");
    const [showContacts, setShowContacts] = useState(searchParams.get('showContacts') === "true");
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Site'>
                <SideBarButton
                    text={`Equipment (${props.equipmentCount})`}
                    iconFont="local_laundry_service"
                    clickEvent={() => setShowEquipment(true)}
                />
                <SideBarButton
                    text={`Contacts (${props.contactCount})`}
                    iconFont="contact_phone"
                    clickEvent={() => setShowContacts(true)}
                />
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <SiteEquipmentList
                siteID={props.siteID}
                show={showEquipment}
                hideFunc={() => setShowEquipment(false)}
                totalCount={props.equipmentCount}
            />

            <SiteContactList 
                siteID={props.siteID} 
                show={showContacts} 
                hideFunc={() => setShowContacts(false)} 
                totalCount={props.contactCount}            
            />

            <SiteHistory
                siteID={props.siteID}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
                totalCount={props.activityCount}
            />
        </>
    )
}

export default SiteAssociatedData