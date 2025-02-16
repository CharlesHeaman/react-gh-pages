import { Dispatch, SetStateAction } from "react";
import getAPI from "../../../../utils/getAPI";
import { SiteCollectionResponse } from "../../../../types/sites.types";

const checkUniqueSiteCode = (
    code: string, 
    setCodeUnique: Dispatch<SetStateAction<boolean>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    siteID?: number,
) => {
    getAPI('sites', {
        codes: [code]
    }, (response: any) => {
        const siteData: SiteCollectionResponse = response.data;
        const nonMatchingSiteID = siteData.data.filter(site => site.id !== siteID);
        setCodeUnique(nonMatchingSiteID.length === 0);
    }, setIsLoading)
}

export default checkUniqueSiteCode