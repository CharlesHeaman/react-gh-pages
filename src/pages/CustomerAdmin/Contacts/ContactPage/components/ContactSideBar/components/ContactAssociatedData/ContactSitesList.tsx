import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { SiteCollectionResponse } from "../../../../../../../../types/sites.types";
import getAPI from "../../../../../../../../utils/getAPI";
import SiteAdvancedSearch from "../../../../../../Sites/components/SiteAdvancedSearch";
import SiteList from "../../../../../../Sites/components/SiteList";
import SiteSearchHeader from "../../../../../../Sites/components/SiteSearchHeader";
import getSiteSearchParams from "../../../../../../Sites/utils/getSiteSearchParams";

const ContactSitesList = (props: {
    contactID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isSitesLoading, setIsSitesLoading] = useState(false);
    const [siteData, setSiteData] = useState<SiteCollectionResponse>();

    // Search Parameters 
    const siteSearchParams = getSiteSearchParams(searchParams);

    useEffect(() => {
        searchSites();
    }, [props.contactID, JSON.stringify(siteSearchParams)])
    
    const searchSites = () => {
        setShowAdvancedSearch(false);
        getAPI('sites', {
            ...siteSearchParams,
            contact_id: props.contactID,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSiteData(siteData);
        }, setIsSitesLoading);
    }

    return (
        <>
            <WindowOverlay
                title='Assigned Sites'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1400}
                top
            >
                <SiteSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <SiteList 
                    hasSearched={true} 
                    isSitesLoading={isSitesLoading}
                    sites={siteData}
                    perPage={siteSearchParams.perPage}
                    totalCount={props.totalCount}
                    showAdvancedSearch={() => setShowAdvancedSearch(true)} 
                    hideCustomer
                />
            </WindowOverlay>

            <SiteAdvancedSearch
                show={showAdvancedSearch}
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default ContactSitesList