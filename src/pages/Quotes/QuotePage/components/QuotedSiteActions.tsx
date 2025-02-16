import { useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import SelectQuotedSiteStatus from "./SelectQuotedSiteStatus";

const QuotedSiteActions = (props: {
    quotedSiteID: number,
    quotedSiteStatus: number,
    getQuotedSites: () => void,
}) => {
    const [showStatus, setShowStatus] = useState(false);
    
    return (
        <>
            <SideBarModule title="Actions">
                <SideBarButton
                    text="Select Status"
                    iconFont="label"
                    color="no-color"
                    clickEvent={() => setShowStatus(true)}
                />
            </SideBarModule>
            
            <SelectQuotedSiteStatus 
                quotedSiteID={props.quotedSiteID} 
                quotedSiteStatus={props.quotedSiteStatus} 
                getQuotedSites={props.getQuotedSites}
                show={showStatus} 
                hideFunc={() => setShowStatus(false)}
            />
        </>

    )
}

export default QuotedSiteActions