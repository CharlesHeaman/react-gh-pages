import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SubmitButton from "../../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { SiteCollectionResponse, SiteResponseData } from "../../../../../../../../../types/sites.types";
import getAPI from "../../../../../../../../../utils/getAPI";
import putAPI from "../../../../../../../../../utils/putAPI";
import SiteSelectList from "../../../../../../../Sites/components/SiteSelectList";
import InfoGrid from "../../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import GridItem from "../../../../../../../../../components/ui/Containers/GridItem/GridItem";

export interface NewSelectItem {
    id: number,
    selected: boolean,
}

const SelectContractedSites = (props: {
    contractID: number,
    customerID: number,
    getSites: (contractID: number) => void,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Form States 
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [startSelectedSites, setStartSelectedSites] = useState<Array<NewSelectItem>>([]);
    const [selectedSites, setSelectedSites] = useState<Array<NewSelectItem>>([]);

    // Data States
    const [isCustomerSitesLoading, setIsCustomerSitesLoading] = useState(false);
    const [customerSiteData, setCustomerSiteData] = useState<SiteCollectionResponse>();
    const [isContractedSitesLoading, setIsContractedSitesLoading] = useState(false);

    useEffect(() => {
        getCustomerSites();
    }, [props.customerID, props.contractID])

    const getCustomerSites = () => {
        getAPI('sites', {
            customer_ids: [props.customerID],
            is_active: true
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setCustomerSiteData(siteData);
            getContractedSites(siteData.data)
        }, setIsCustomerSitesLoading);
    }

    const getContractedSites = (customerSites: Array<SiteResponseData>) => {
        getAPI('sites', {
            contract_ids: [props.contractID]
        }, (response: any) => {
            const contractedSiteData: SiteCollectionResponse = response.data;
            const contractedSiteIDs: Array<number> = contractedSiteData.data.map(site => site.id);
            const selectedSites: Array<NewSelectItem> = customerSites.map(site => {
                return {
                    id: site.id,
                    selected: contractedSiteIDs.includes(site.id)
                }
            })
            setStartSelectedSites(selectedSites);
            setSelectedSites(selectedSites);
        }, setIsContractedSitesLoading);
    }

    const updateSelection = (siteID: number) => {
        setSelectedSites(prevState => 
            prevState.map(selectItem => {
                if (siteID === selectItem.id) {
                    return {
                        ...selectItem,
                        selected: !selectItem.selected
                    }
                }
                return selectItem
            })
        )
    }

    const updateContractedSites = () => {
        const updatedSites  = selectedSites.filter((site, index) => 
            site.selected !== startSelectedSites[index].selected
        );
        putAPI(`sites/collection_select_contract`, {}, {
            select_site_ids: updatedSites.filter(site => site.selected).map(site => site.id),
            remove_site_ids: updatedSites.filter(site => !site.selected).map(site => site.id),
            contract_id: props.contractID
        }, () => {
            props.hideFunc();
            props.getSites(props.contractID);
        }, setIsSubmitting)
    }

    return (
        <>
            <WindowOverlay
                title='Select Contracted Sites'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1400}
                footer={<SubmitButton
                    text="Update Contracted Sites"
                    iconFont="checklist_rtl"
                    clickFunc={updateContractedSites}
                    submitting={isSubmitting}
                    submittingText="Updating..."
                />}
            >
                <InfoGrid>
                    <GridItem>
                        <p>Select sites to be assigned as under contract.</p>
                    </GridItem>
                </InfoGrid>
                <SiteSelectList 
                    hasSearched={true} 
                    isSitesLoading={isCustomerSitesLoading || isContractedSitesLoading}
                    selectedIDs={selectedSites.filter(selectItem => selectItem.selected).map(selectItem => selectItem.id)}
                    updateSelection={updateSelection}
                    hideDepartment
                    sites={customerSiteData}
                    perPage={10}
                />
            </WindowOverlay>

        </>
    )
}

export default SelectContractedSites