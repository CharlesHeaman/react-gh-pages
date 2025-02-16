import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Header from "../../../components/ui/Structure/Header/Header";
import { SiteCollectionResponse } from "../../../types/sites.types";
import getAPI from "../../../utils/getAPI";
import CustomerAdminNavigation from "../components/CustomerAdminNavigation";
import SiteAdvancedSearch from "./components/SiteAdvancedSearch";
import SiteList from "./components/SiteList";
import SiteSearchHeader from "./components/SiteSearchHeader";
import getSiteSearchParams from "./utils/getSiteSearchParams";

const SiteListPage = () => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    
    // Data States
    const [isSitesLoading, setIsSitesLoading] = useState(false);
    const [siteData, setSiteData] = useState<SiteCollectionResponse>();
    
    // Search Parameters 
    const hasSearched = searchParams.get(`sites_has_searched`) === "true";
    const siteSearchParams = getSiteSearchParams(searchParams);

    useEffect(() => {
        hasSearched && searchSites();
    }, [JSON.stringify(siteSearchParams)])
    
    const searchSites = () => {
        setShowAdvancedSearch(false);
        getAPI('sites', {
            ...siteSearchParams,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSiteData(siteData);
        }, setIsSitesLoading);
    }

    return (
        <>
            <CustomerAdminNavigation location='sites'/>
            <OuterContainer 
                title='Customer Sites' 
                description='Create, edit and deactivate customer sites. Manage site equipment, contacts and contracts.'
                maxWidth={2000}
                noBorder
            >
                <SiteSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <SiteList 
                    hasSearched={hasSearched} 
                    isSitesLoading={isSitesLoading}
                    sites={siteData}
                    perPage={siteSearchParams.perPage}
                    showAdvancedSearch={() => setShowAdvancedSearch(true)} 
                />
            </OuterContainer> 

            <SiteAdvancedSearch
                show={showAdvancedSearch}
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default SiteListPage