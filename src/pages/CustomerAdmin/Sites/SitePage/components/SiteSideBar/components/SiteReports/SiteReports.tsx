import { useState } from "react";
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { CustomerResponseData } from "../../../../../../../../types/customers.types";
import { SiteResponseData } from "../../../../../../../../types/sites.types";
import SiteRefrigerant from "./SiteRefrigerant/SiteRefrigerant";
import SiteTypeSummary from "../../../../../../../Quotes/QuotePage/components/SiteTypeSummary";

const SiteReports = (props: {
    siteID: number,
    site: SiteResponseData,
    customer: CustomerResponseData
}) => {
    const [showRefrigerant, setShowRefrigerant] = useState(false);
    const [showEquipment, setShowEquipment] = useState(false);
    return (
        <>
            <SideBarModule title="Reports">
                <SideBarButton 
                    text="Equipment Summary" 
                    iconFont="local_laundry_service" 
                    clickEvent={() => setShowEquipment(true)}
                />
                <SideBarButton 
                    text="Refrigerant Holding" 
                    iconFont="propane_tank" 
                    clickEvent={() => setShowRefrigerant(true)}
                />
            </SideBarModule>

            <SiteRefrigerant
                siteID={props.siteID}
                site={props.site}
                customer={props.customer}
                show={showRefrigerant}
                hideFunc={() => setShowRefrigerant(false)}
            />

            <SiteTypeSummary
                siteID={props.siteID}
                show={showEquipment}
                hideFunc={() => setShowEquipment(false)}
            />
        </>
    )
}

export default SiteReports