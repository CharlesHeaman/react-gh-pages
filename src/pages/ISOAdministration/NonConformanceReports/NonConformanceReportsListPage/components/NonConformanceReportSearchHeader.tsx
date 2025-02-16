import CreateButton from "../../../../../components/form/CreateButton/CreateButton"
import QueryFilterSelect from "../../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../../components/form/SearchForm/SearchForm"
import PermsProtectedComponent from "../../../../../components/PermsProtectedComponent"
import HeaderFlex from "../../../../../components/ui/HeaderFlex"


const NonConformanceReportSearchHeader = () => {

    // Filters
    const isProcessedFilter = [
        {
            text: 'Pending',
            value: false,
            iconFont: 'pending',
            selected: true
        },
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
        }
    ]

    return (
        <HeaderFlex>
            <SearchForm
                placeHolder="Search all non-conformance reports by cause..."
                prefix="non_conformance_reports"
            />
            <QueryFilterSelect
                selections={isProcessedFilter}
                paramName="non_conformance_reports_is_processed"
            />
            <PermsProtectedComponent requiredPerms={{ iso: 2 }}>
                <CreateButton 
                    text="Create Non-conformance Report"
                    to="iso/non_conformance_report/create"
                />
            </PermsProtectedComponent>
        </HeaderFlex>
    )
}

export default NonConformanceReportSearchHeader