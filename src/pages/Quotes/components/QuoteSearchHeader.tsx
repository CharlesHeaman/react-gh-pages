import { useSearchParams } from "react-router-dom";
import CreateButton from "../../../components/form/CreateButton/CreateButton";
import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect";
import SearchForm from "../../../components/form/SearchForm/SearchForm";
import ClearAdvancedSearchButton from "../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton";
import HeaderFlex from "../../../components/ui/HeaderFlex";
import getObjectHasValue from "../../../utils/getObjectHasValue";
import PermsProtectedComponent from "../../../components/PermsProtectedComponent";
import OrderBySelect from "../../../components/ui/PaginationNavigation/OrderBySelect";

const QuoteSearchHeader = (props: {
    showAdvancedSearch: () => void,
    departmentName: string,
    customerID?: number,
    siteID?: number,
    equipmentID?: number,
    startAll?: boolean,
    isJobs?: boolean
}) => {
    // Filters
    const statusFilterOptions = !props.isJobs ?
    [
        {
            text: 'Open',
            value: 'open',
            iconFont: 'pending',
            selected: !props.startAll
        },
        {
            text: 'Sent',
            value: 'sent',
            iconFont: 'mark_email_read',
            selected: false
        },
        {
            text: 'Awaiting Approval',
            value: 'awaiting_approval',
            iconFont: 'hourglass_empty',
            selected: false
        },
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
            selected: props.startAll
        }
    ] : [
        {
            text: 'Open',
            value: 'open',
            iconFont: 'pending',
            selected: !props.startAll
        },
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
            selected: props.startAll
        }
    ];

    // Order By
    const orderByOptions = [
        {
            text: 'Number',
            iconFont: 'tag',
            value: 'number',
            selected: true
        },
        {
            text: 'Originator Name',
            iconFont: 'person',
            value: 'originator_name',
        },
        {
            text: 'Customer Name',
            iconFont: 'groups',
            value: 'customer_name'
        },
        {
            text: 'Description',
            iconFont: 'notes',
            value: 'Description'
        },
        {
            text: 'Value',
            iconFont: 'currency_pound',
            value: 'value'
        },
        {
            text: 'Created Date',
            iconFont: 'add',
            value: 'created_at'
        },
        {
            text: 'Status',
            iconFont: 'thumbs_up_down',
            value: 'status'
        }
    ];

    const advancedParams = {};
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    return (
        <>
            <HeaderFlex>
                <SearchForm
                    // showAdvancedSearch={props.showAdvancedSearch}
                    placeHolder={`Search all ${!props.isJobs ? 'quotes' : 'jobs'} by customer or number...`}
                    prefix="quotes"
                    // hasAdvancedSearch={hasAdvancedSearch}
                />
                <OrderBySelect 
                    resourceName={!props.isJobs ? 'quotes' : 'quotes_job'}
                    selections={orderByOptions}
                />
                <QueryFilterSelect
                    selections={statusFilterOptions}
                    paramName={!props.isJobs ? 'quotes_status' : 'quotes_job_status'}
                />
                <PermsProtectedComponent requiredPerms={{ quotes: 2 }}>
                    <CreateButton 
                        text={"Create Quote"} 
                        to={`${props.departmentName}/quotes/create${props.customerID ? `?customer_id=${props.customerID}` : ''}${props.siteID ? `?site_id=${props.siteID}` : ''}${props.equipmentID ? `?equipment_id=${props.equipmentID}` : ''}`}
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
            {hasAdvancedSearch ? 
                <ClearAdvancedSearchButton 
                    clearFunc={() => null}
                /> : 
                null
            }
        </>
    )
}

export default QuoteSearchHeader