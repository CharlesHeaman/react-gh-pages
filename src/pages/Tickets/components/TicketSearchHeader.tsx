import { useSearchParams } from "react-router-dom";
import CreateButton from "../../../components/form/CreateButton/CreateButton";
import SearchForm from "../../../components/form/SearchForm/SearchForm";
import ClearAdvancedSearchButton from "../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton";
import HeaderFlex from "../../../components/ui/HeaderFlex";
import getObjectHasValue from "../../../utils/getObjectHasValue";
import clearSiteAdvancedSearchParams from "../../CustomerAdmin/Sites/components/clearSiteAdvancedSearchParams";
import getSiteAdvancedSearchParams from "../../CustomerAdmin/Sites/utils/getSiteAdvancedSearchParams";
import PermsProtectedComponent from "../../../components/PermsProtectedComponent";
import TicketListFilter from "./TicketListFilter";

const TicketSearchHeader = (props: {
    departmentName: string,
    showAdvancedSearch: () => void,
    customerID?: number,
    siteID?: number,
    equipmentID?: number
    jobID?: number
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const advancedParams = getSiteAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const getCreateURL = (): string => {
        const url = `${props.departmentName}/tickets/create`;
        if (props.customerID) return `${url}?customer_id=${props.customerID}`;
        if (props.siteID) return `${url}?site_id=${props.siteID}`;
        if (props.equipmentID) return `${url}?equipment_id=${props.equipmentID}`;
        if (props.jobID !== undefined) return `${url}?job_id=${props.jobID}`;
        return url;
    }

    return (
        <>
            <HeaderFlex>
                <SearchForm
                    showAdvancedSearch={props.showAdvancedSearch}
                    placeHolder="Search all tickets by number..."
                    prefix="tickets"
                    hasAdvancedSearch={hasAdvancedSearch}
                />
                <TicketListFilter/>
                <PermsProtectedComponent requiredPerms={{ tickets: 2 }}>
                    <CreateButton 
                        text={"Create Maintenance Tickets"} 
                        to={`${props.departmentName}/tickets/create_maintenance`}
                        iconFont="confirmation_number"
                    />
                    <CreateButton 
                        text={"Create Service Ticket"} 
                        to={getCreateURL()}
                        iconFont="local_activity"
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
            {hasAdvancedSearch ? 
                <ClearAdvancedSearchButton 
                    clearFunc={() => clearSiteAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                /> : 
                null
            }
        </>
    )
}

export default TicketSearchHeader