import { useState } from "react";
import SubmitButton from "../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import postAPI from "../../../../../utils/postAPI";
import { useSearchParams } from "react-router-dom";
import SiteSelect from "../../../../../components/form/SiteSelect/SiteSelect";
import { QuotedSiteResponseData } from "../../../../../types/quotedSites.types";
import { SiteResponseData } from "../../../../../types/sites.types";

const AddQuotedSite = (props: {
    quoteID: number,
    customerID: number,
    getQuotedSite: (quoteID: number) => void
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateLocation = (quotedSiteID: number) => {
        searchParams.set('quoted_site_id', quotedSiteID.toString());
        setSearchParams(searchParams);
    } 

    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [selectedSite, setSelectedSite] = useState<SiteResponseData>();

    const assignToEngineer = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI(`quoted_sites/create`, {}, {
            quote_id: props.quoteID,
            site_id: selectedSite.id
        }, (response: any) => {
            const quotedSiteData: QuotedSiteResponseData = response.data;
            props.hideFunc();
            props.getQuotedSite(props.quoteID);
            updateLocation(quotedSiteData.id)
        }, setIsUpdating)
    }

    const formComplete = (
        selectedSite?.id !== undefined 
    );

    return (
        <WindowOverlay 
            title={"Add Quoted Site"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton 
                text={"Add Quoted Site"} 
                iconFont="add"
                disabled={hasSubmitted && !formComplete} 
                submitting={isUpdating}
                submittingText="Adding..."
                clickFunc={assignToEngineer}            
            />} 
        >
            <InfoGrid>
                <GridItem title='Site'>
                    <SiteSelect 
                        selectedSite={selectedSite} 
                        setSelectedSite={setSelectedSite} 
                        customerID={props.customerID}
                        hasSubmitted={hasSubmitted}
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default AddQuotedSite