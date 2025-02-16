import { useSearchParams } from "react-router-dom";
import CreateButton from "../../../components/form/CreateButton/CreateButton";
import SearchForm from "../../../components/form/SearchForm/SearchForm";
import HeaderFlex from "../../../components/ui/HeaderFlex";
import getObjectHasValue from "../../../utils/getObjectHasValue";
import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect";
import PermsProtectedComponent from "../../../components/PermsProtectedComponent";

const RequisitionSearchHeader = (props: {
    vehicleID?: number,
    ticketID?: number,
    ticketType?: number,
    jobID?: number,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters
    const filterOptions = [
        {
            text: 'Pending',
            value: false,
            iconFont: 'pending',
            selected: false
        },
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
            selected: true
        }
    ]

    const advancedParams = {};
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const getCreateURL = (): string => {
        const url = 'requisitions/create';
        if (props.vehicleID) return `${url}?vehicle_id=${props.vehicleID}`;
        if (props.ticketID && props.ticketType !== undefined) return `${url}?ticket_id=${props.ticketID}&ticket_type=${props.ticketType}`;
        if (props.jobID !== undefined) return `${url}?job_id=${props.jobID}`;
        return url;
    }


    return (
        <HeaderFlex>
            <SearchForm
                placeHolder="Search requisitions by number..."
                prefix="requisitions"
                hasAdvancedSearch={hasAdvancedSearch}
            />
            <QueryFilterSelect
                selections={filterOptions}
                paramName="requisitions_is_complete"
            />
            <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                <CreateButton 
                    text={"Create Requisition"} 
                    to={getCreateURL()}
                />
            </PermsProtectedComponent>
        </HeaderFlex>
    )
}

export default RequisitionSearchHeader