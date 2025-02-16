import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import CustomerContactList from "../components/CustomerContacts/CustomerContactList"
import CustomerEquipmentList from "../CustomerEquipment/CustomerEquipmentList"
import CustomerSitesList from "../CustomerSites/CustomerSitesList"
import CustomerContractsList from "./components/CustomerContracts"
import CustomerHistory from "./CustomerHistory"

const CustomerAssociatedData = (props: {
    customerID: number,
    siteIDs: Array<number>,
    siteCount: number,
    equipmentCount: number,
    contractCount: number,
    contactCount: number,
    activityCount: number,
}) => {
    const [searchParams] = useSearchParams();

    const [showSites, setShowSites] = useState(searchParams.get("showSites") === "true");
    const [showEquipment, setShowEquipment] = useState(searchParams.get("showEquipment") === "true");
    const [showContracts, setShowContracts] = useState(searchParams.get("showContracts") === "true");
    const [showContacts, setShowContacts] = useState(searchParams.get("showContacts") === "true");
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Customer'>
                <SideBarButton
                    text={`Sites (${props.siteCount})`}
                    iconFont="business"
                    clickEvent={() => setShowSites(true)}
                />
                <SideBarButton
                    text={`Equipment (${props.equipmentCount})`}
                    iconFont="local_laundry_service"
                    clickEvent={() => setShowEquipment(true)}
                />
                <SideBarButton
                    text={`Contracts (${props.contractCount})`}
                    iconFont="history_edu"
                    clickEvent={() => setShowContracts(true)}
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

            <CustomerSitesList
                customerID={props.customerID}
                show={showSites}
                hideFunc={() => setShowSites(false)}
                totalCount={props.siteCount}
            />

            <CustomerEquipmentList
                customerID={props.customerID}
                siteIDs={props.siteIDs}
                show={showEquipment}
                hideFunc={() => setShowEquipment(false)}
                totalCount={props.siteCount}            
            />

            <CustomerContractsList
                customerID={props.customerID}
                show={showContracts}
                hideFunc={() => setShowContracts(false)}
                totalCount={props.contractCount}        
            />

            <CustomerContactList
                customerID={props.customerID}
                show={showContacts}
                hideFunc={() => setShowContacts(false)}
                totalCount={props.contactCount}        
            />

            <CustomerHistory
                customerID={props.customerID}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
                totalCount={props.activityCount}
            />
        </>
    )
}

export default CustomerAssociatedData