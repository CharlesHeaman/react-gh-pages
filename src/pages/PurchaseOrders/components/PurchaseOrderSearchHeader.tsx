import { useSearchParams } from "react-router-dom";
import CreateButton from "../../../components/form/CreateButton/CreateButton";
import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect";
import SearchForm from "../../../components/form/SearchForm/SearchForm";
import HeaderFlex from "../../../components/ui/HeaderFlex";
import getObjectHasValue from "../../../utils/getObjectHasValue";
import getPurchaseOrderAdvancedSearchParams from "../utils/getPurchaseOrderAdvancedSearchParams";
import ClearAdvancedSearchButton from "../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton";
import clearPurchaseOrderAdvancedSearchParams from "../utils/clearPurchaseOrderAdvancedSearchParams";
import PermsProtectedComponent from "../../../components/PermsProtectedComponent";

const PurchaseOrderSearchHeader = (props: {
    showAdvancedSearch: () => void
    supplierManufacturerID?: number,
    vehicleID?: number,
    ticketID?: number,
    ticketType?: number,
    jobID?: number,
    startAll?: boolean
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters
    const outstandingFilterOptions = [
        {
            text: 'Unsent',
            value: 'unsent',
            iconFont: 'mark_email_unread',
            selected: false
        },
        {
            text: 'Outstanding',
            value: 'outstanding',
            iconFont: 'pending',
            selected: !props.startAll
        },
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
            selected: props.startAll
        }
    ]

    const advancedParams = getPurchaseOrderAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const getCreateURL = (): string => {
        const url = 'purchase_orders/create';
        if (props.supplierManufacturerID) return `${url}?supplier_manufacturer_id=${props.supplierManufacturerID}`
        if (props.vehicleID) return `${url}?vehicle_id=${props.vehicleID}`;
        if (props.jobID) return `${url}?job_id=${props.jobID}`;
        if (props.ticketID && props.ticketType !== undefined) return `${url}?ticket_id=${props.ticketID}&ticket_type=${props.ticketType}`;
        return url;
    }

    return (
        <HeaderFlex>
            <SearchForm
                showAdvancedSearch={props.showAdvancedSearch}
                placeHolder="Search purchase orders by number..."
                prefix="purchase_orders"
                hasAdvancedSearch={hasAdvancedSearch}
            />
             {hasAdvancedSearch ? 
                <ClearAdvancedSearchButton 
                    clearFunc={() => clearPurchaseOrderAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                /> : 
                null
            }
            <QueryFilterSelect
                selections={outstandingFilterOptions}
                paramName="purchase_orders_status"
            />
            <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                <CreateButton 
                    text={"Create Purchase Order"} 
                    to={getCreateURL()}
                />
            </PermsProtectedComponent>
        </HeaderFlex>
    )
}

export default PurchaseOrderSearchHeader