import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import ShowCreateButton from "../../../../components/form/ShowCreateButton/ShowCreateButton"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"
import HeaderFlex from "../../../../components/ui/HeaderFlex"

const MethodStatementTemplateSearchHeader = (props: {
    showCreate: () => void
}) => {
    // Filters
    const activeFilterOptions = [
        {
            text: 'Active',
            value: true,
            iconFont: 'check_circle',
            selected: true
        },
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
        }
    ]

    
    return (
        <>
            <HeaderFlex>
                <SearchForm
                    placeHolder="Search all method statements templated by name..."
                    prefix="method_statement_templates"
                />
                <QueryFilterSelect
                    selections={activeFilterOptions}
                    paramName="method_statement_templates_is_active"
                />
                <PermsProtectedComponent requiredPerms={{ templates: 2 }}>
                    <ShowCreateButton 
                        text={"Create Template"}
                        clickFunc={props.showCreate} 
                    />
                </PermsProtectedComponent>

            </HeaderFlex>
        </>
    )
}

export default MethodStatementTemplateSearchHeader