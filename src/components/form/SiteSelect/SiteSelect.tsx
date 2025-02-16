import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { SiteCollectionResponse, SiteResponseData } from "../../../types/sites.types";
import getAPI from "../../../utils/getAPI";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";

const SiteSelect = (props: {
    selectedSite: SiteResponseData | undefined,
    setSelectedSite: Dispatch<SetStateAction<SiteResponseData | undefined>>,
    required?: boolean,
    customerID?: number,
    hasSubmitted: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isSitesLoading, setIsSitesLoading] = useState(false);
    const [sitesData, setSitesData] = useState<SiteCollectionResponse>();

    useEffect(() => {
        getSites();
    }, [searchTerm, props.customerID])

    const getSites = () => {
        getAPI('sites', {
            code_or_name_like: searchTerm,
            customer_ids: props.customerID ? [props.customerID] : undefined,
            is_active: true,
        }, (response: any) => {
            const sitesData: SiteCollectionResponse = response.data;
            setSitesData(sitesData);
        }, setIsSitesLoading);
    }

    const showRequired = props.selectedSite === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="business"
                resourceName="site"
                resourceNamePlural="sites"
                selectedText={props.selectedSite?.data.name}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={sitesData ? sitesData.data.map(site => {
                    return {
                        text: site.data.name,
                        clickFunc: () => props.setSelectedSite(site),
                        selected: props.selectedSite?.id === site.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Site is required`}
                show={showRequired}
            />}
        </>
    )
}

export default SiteSelect